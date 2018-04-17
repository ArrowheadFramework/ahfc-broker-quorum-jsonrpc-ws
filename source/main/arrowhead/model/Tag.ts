/**
 * Arbitrary `data` associated with some other _Broker_ data subject.
 *
 * # Tag Subjects
 *
 * Each `Tag` has a `subjectId` field, which identifies its subject. The
 * `subjectId` can identify an `Exchange` or a `Token` object. The type of the
 * subject is not provided by the `Tag` itself, and must be known from the
 * context in which it is used.
 */
export interface Tag {
    /**
     * String uniquely identifying this `Tag`.
     */
    id?: string;

    /**
     * String identifying tagged object.
     */
    subjectId: string;

    /**
     * Arbitrary string classifying the contents of this `Tag`.
     */
    kind: string;

    /**
     * Arbitrary metadata associated with the tagged data entry.
     */
    data: any;
}