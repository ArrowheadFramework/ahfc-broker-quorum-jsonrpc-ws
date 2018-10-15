/**
 * `ProposalError` kinds.
 */
export enum ProposalErrorKind {
    ProposalNotYetAcceptable = "ProposalNotYetAcceptable",
    ProposalNotFound = "ProposalNotFound",
    ProposalNotSatisfiable = "ProposalNotSatisfiable",
    ProposalReceiverNotFound = "ProposalReceiverNotFound",
    RequestBlocked = "RequestBlocked",
    RequestFailed = "RequestFailed",
    RequestInvalid = "RequestInvalid",
    RequestNotLegal = "RequestNotLegal",
    RequestNotSupported = "RequestNotSupported",
    RequestTimeout = "RequestTimeout",
}