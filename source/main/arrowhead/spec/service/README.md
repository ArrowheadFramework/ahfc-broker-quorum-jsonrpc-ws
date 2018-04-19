# Arrowhead Service Interfaces

This folder contains documentation and TypeScript interfaces related to the
formal Arrowhead service interface specification of the Broker system.

Significantly, this folder contains the following files:

| File Entry                   | Description                                                            |
|:-----------------------------|:-----------------------------------------------------------------------|
| [`BrokerAccounting.ts`][bac] | Accounts for [`Exchange`s][ex], [`Ownership`s][ow] and [`Token`s][to]. |
| [`Brokering.ts`][bro]        | Allows distribution, ratifiation and rejection of [`Proposal`s][pr].   |
| [`BrokeringPush.ts`][brp]    | Allows reception of [`Proposal`s][pr] and related messages.            |
| [`BrokerTagging.ts`][bta]    | Facilitates [`Tag`ging][ta] of [`Exchange`s][ex] and [`Token`s][to].   |

[bac]: BrokerAccounting.ts
[bro]: Brokering.ts
[brp]: BrokeringPush.ts
[bta]: BrokerTagging.ts

[ex]: ../model/Exchange.ts
[ow]: ../model/Ownership.ts
[to]: ../model/Token.ts
[pr]: ../model/Proposal.ts
[ta]: ../model/Tag.ts