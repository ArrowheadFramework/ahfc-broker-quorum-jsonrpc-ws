import * as model from "../model";

/**
 * Represents an Arrowhead service useful for exchanging ownerhip `Token`s
 * through a three-step process.
 *
 * # Sender's Interface
 *
 * This interface is used for _sending_ relevant messages. The `BrokeringPush`
 * interface is used for _receiving_ messages.
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
 * The state machine is illustrated below. The star (*) states represent the
 * premature termination of an exchange.
 *
 * ```diagram
 *  propose!
 *     |
 *     V
 * +--------+ accepted? +-----------+ confirmed? +---------+
 * | OFFERO |---------->| CONCENTIO |----------->| RECIPIO |
 * +--------+           +-----------+            +---------+
 *     | rejected?           | aborted?
 *     V                     V
 *     *                     *
 * ```
 * 
 * ## Exchange Negotiation
 *
 * The state machine facilitated by this interface allows two parties to
 * continually negotiate about an exchange through the use of _unqualified_
 * _proposals_. A `Proposal` is unqualified only if it cointains any source of
 * ambiguity, meaning it contains `OR` or `XOR` constructs, or at least one
 * `Token` without an `id`.
 * 
 * An unqualified `Proposal` can only be rejected by its receiver, but can serve
 * as foundation for formulating a counter-`Proposal`. By starting with an
 * unqualified `Proposal`, two parties can exchange proposals with decreasing
 * ambiguity until a _qualified proposal_ has been formulated, which can be
 * accepted and confirmed if desired by the two parties.
 *
 * ## Exchanges and Confidence
 *
 * If a `Proposal` is formulated and sent to multiple receivers, one state
 * machine is maintained between the sender and each receiver. As multiple
 * receivers may accept the `Proposal`, and there may not be enough tokens to
 * satisfy the claims of each accepting receiver, the proposer may have to
 * abort some of the accepts.
 * 
 * Aborting an accepted `Proposal` could lead to loss of confidence. From the
 * perspective of the receiver, an exchange that initially seemed acceptable to
 * both parties was unexpectedly aborted. To avoid any confusion, the sender of
 * a `Proposal` must append a set of _rules_, which clarify whether the exchange
 * is open to multiple parties, is private or public, etc.
 *
 * ## Exchange Completion
 *
 * If an exchange reaches the `RECIPIO` state, the exchange is finalized by
 * the trading platform used by the system. The platform must guarantee the
 * following things:
 *
 * 1. A single _deed_ is created that holds (1) the signatures of both parties
 *    performing the exchange, (2) the fully qualified token sets being
 *    exchanged, and (3) an explicit designation of which party is the owner of
 *    which of the two token sets after the exchange. It may also hold any other
 *    data of relevance to the trading platform, such as dates, etc.
 *    Essentially, enough data needs to be registered for an `Exchange` object
 *    to be constructed.
 * 2. Each token in the sets included in the created deed must either (a) not
 *    exist before the exchange, or (b) be owned by the party transferring its
 *    ownership. A `Token` is considered previously non-existing only if there
 *    is no known `Token` with the same `id`.
 */
export interface Brokering {
    /**
     * Proposes a `Token` exchange.
     *
     * __Global Proposals__. If the `proposal` `receivers` is `PartyALL`, then
     * the method returns `null`.
     *
     * @param proposal Exchange `Proposal`.
     * @returns Receiving party public keys and `Proposal` identifiers, if any.
     */
    propose(proposal: model.Proposal): [Buffer, string][];

    /**
     * Accepts a _fully qualified proposal_, making it pending ratification.
     *
     * If the accepted `Proposal` isn't fully qualified, or if `deadline` has
     * already expired, the call fails and an `Error` is thrown.
     * 
     * @param id Exchange `Proposal` identifier.
     * @param deadline Moment when this acceptance seizes to be valid.
     */
    accept(id: string, deadline: Date);

    /**
     * Rejects `Proposal`.
     *
     * @param id Exchange `Proposal` identifier.
     */
    reject(id: string);

    /**
     * Confirms an accepted `Proposal`, making it binding.
     *
     * If the confirmed `Proposal` isn't fully qualified by you and accepted by
     * a counter-party, the call fails and an `Error` is thrown.
     * 
     * @param id Exchange `Proposal` identifier.
     */
    confirm(id: string);

    /**
     * Aborts accepted exchange `Proposal`.
     * 
     * If the aborted `Proposal` isn't fully qualified by you and accepted by a
     * counter-party, the call fails and an `Error` is thrown.
     * 
     * @param id Exchange `Proposal` identifier.
     */
    abort(id: string);
}
