# Arrowhead Service Interfaces

This folder contains documentation and TypeScript interfaces related to the
formal Arrowhead service interface specification of the Broker system.

## Significant Files and Folders

| File Entry                   | Description                                                            |
|:-----------------------------|:-----------------------------------------------------------------------|
| [`BrokerAccounting.ts`][bac] | Accounts for [`Exchange`][ex]s, [`Ownership`][ow]s and [`Token`][to]s. |
| [`Brokering.ts`][bro]        | Allows distribution, ratifiation and rejection of [`Proposal`][pr]s.   |
| [`BrokeringPush.ts`][brp]    | Allows reception of [`Proposal`][pr]s and related messages.            |
| [`BrokerTagging.ts`][bta]    | Facilitates [`Tag`][ta]ging of [`Exchange`][ex]s and [`Token`][to]s.   |

[bac]: BrokerAccounting.ts
[bro]: Brokering.ts
[brp]: BrokeringPush.ts
[bta]: BrokerTagging.ts

[ex]: ../model/Exchange.ts
[ow]: ../model/Ownership.ts
[to]: ../model/Token.ts
[pr]: ../model/Proposal.ts
[ta]: ../model/Tag.ts