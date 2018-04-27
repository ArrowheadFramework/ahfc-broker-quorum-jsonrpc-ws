import { Proposal } from "../model";

/**
 * A service useful for exchanging `Token`s through a three-step process.
 *
 * # Sender's Interface
 *
 * This interface is used by consuming AHF systems to _send_ relevant messages.
 * The `BrokeringPush` interface is used to _receive_ messages.
 *
 * # Exchange State Machine
 *
 * An ownership exchange can be modelled as a state machine with three
 * significant states, namely _Offero_, _Concentio_ and _Recipio_. As described
 * in the below table, the first state is entered when a proposing party (A)
 * sends an exchange proposal, while the second is entered if a proposal is
 * accepted by a receiving party (B). The third state is entered if the
 * acceptance is confirmed by the original sender (A).
 * 
 * | State    | Description                                                    |
 * |:---------|:---------------------------------------------------------------|
 * | OFFERO   | Proposal sent and awaiting __B__ acceptance or rejection.      |
 * | CONCENTIO| Proposal accepted and awaiting __A__ confirmation or abortion. |
 * | RECIPIO  | Proposal confirmed, and thereby put in force.                  |
 *
 * The state machine is illustrated below. The stars (*) represent terminating
 * states.
 *
 * ```diagram
 *  propose!
 *     |
 *     V
 * +--------+ accepted? +-----------+ confirmed? +---------+
 * | OFFERO |---------->| CONCENTIO |----------->| RECIPIO |
 * +--------+           +-----------+            +---------+
 *     | rejected?           | aborted?               |
 *     V                     V                        V
 *     *                     *                        *
 * ```
 * 
 * ## Exchange Negotiation
 *
 * The state machine facilitated by this interface allows two parties to
 * continually negotiate about an exchange through the use of _unqualified_
 * _proposals_. A `Proposal` is unqualified only if it cointains any source of
 * ambiguity, meaning it contains `TokenIOR` or `TokenXOR` constructs, or at
 * least one `Token` without an `id`.
 * 
 * An unqualified `Proposal` cannot be accepted or rejected by its receiver, but
 * can serve as foundation for formulating a counter-`Proposal`. By starting
 * with an unqualified `Proposal`, two parties can exchange proposals with
 * decreasing ambiguity until a _qualified proposal_ has been formulated, which
 * can be accepted and confirmed if desired by the two parties.
 *
 * ## Exchange Completion
 *
 * If an exchange reaches the `RECIPIO` state, the exchange is finalized by
 * the trading platform used by the system. The platform must guarantee the
 * following things:
 *
 * 1. A single _deed_ is created that holds (1) the signatures of both parties
 *    performing the exchange, (2) the qualified token sets being exchanged, and
 *    (3) an explicit designation of which party is the owner of which of the
 *    two token sets after the exchange. It may also hold any other data of
 *    relevance to the trading platform, such as dates, etc. Essentially, enough
 *    data needs to be registered for an `Exchange` object to be constructed.
 * 2. Each token in the sets included in the created deed must either (a) not
 *    exist before the exchange, or (b) be owned by the party transferring its
 *    ownership. A `Token` is considered previously non-existing only if there
 *    is no known `Token` with the same `id`.
 */
export interface Brokering {
    /**
     * Proposes a `Token` exchange.
     *
     * @param proposal Exchange `Proposal`.
     * @param receiverKeys The receivers of `proposal`. An empty array is
     *        interpreted as representing all possible receivers.
     * @returns Promise of proposal identifier, unless proposal is unqualified.
     */
    propose(proposal: Proposal, ...receiverKeys: Buffer[]): Promise<string | null>;

    /**
     * Accepts a _qualified_ `Proposal`, making it pending confirmation.
     *
     * __Errors__. If the accepted `Proposal` doesn't exist, or if `deadline`
     * has already expired, the call fails and an `Error` is thrown.
     * 
     * @param id Exchange `Proposal` identifier.
     * @param deadline Moment when this acceptance ceases to be valid.
     * @returns Promise of operation completion.
     */
    accept(id: string, deadline: Date): Promise<void>;

    /**
     * Rejects a _qualified_ `Proposal`.
     *
     * __Errors__. If the rejected `Proposal` doesn't exist, the call fails
     * and an `Error` is thrown.
     *
     * @param id Exchange `Proposal` identifier.
     * @returns Promise of operation completion.
     */
    reject(id: string): Promise<void>;

    /**
     * Confirms an accepted `Proposal`, making it binding.
     *
     * __Errors__. If the confirmed `Proposal` was not originally proposed by
     * the caller, is qualified, and was accepted by `acceptor`, the call fails
     * and an `Error` is thrown.
     * 
     * @param id Exchange `Proposal` identifier.
     * @param acceptorKey Identifies party having accepted `Proposal`.
     * @returns Promise of operation completion.
     */
    confirm(id: string, acceptorKey: Buffer): Promise<void>;

    /**
     * Aborts accepted exchange `Proposal`.
     * 
     * __Errors__. If the aborted `Proposal` was not originally proposed by the
     * caller, is qualified, and was accepted by `acceptor`, the call fails and
     * an `Error` is thrown.
     * 
     * @param id Exchange `Proposal` identifier.
     * @param acceptorKey Identifies party having accepted `Proposal`.
     * @returns Promise of operation completion.
     */
    abort(id: string, acceptorKey: Buffer): Promise<void>;
}
