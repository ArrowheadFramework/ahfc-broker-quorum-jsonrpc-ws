# Arrowhead Abstract Information Model

This folder contains TypeScript data interfaces and utility functions together
specifying an Arrowhead _Abstract Information Model_.

Significantly, this folder contains the below listed files.

## Core Data Types

These are the primary primitives required to interact with an AHF Broker via its
service interfaces:

| File Entry            | Description                                                      |
|:----------------------|:-----------------------------------------------------------------|
| [`Exchange.ts`][exc]  | Describes a previously accepted and confirmed [`Proposal`][pro]. |
| [`Ownership.ts`][own] | States that one [`Party`][par] owns a particular [`Token`][tok]. |
| [`Party.ts`][par]     | Identifies one party that can own and exchange [`Token`s][tok].  |
| [`Proposal.ts`][pro]  | Describes a [`Token`][tok] exchange proposal.                    |
| [`Tag.ts`][tag]       | Associated metadata with an [`Exchange`][exc] or [`Token`][tok]. |
| [`Token.ts`][tok]     | Uniquely identifies an ownable entity.                           |

[exc]: Exchange.ts
[own]: Ownership.ts
[par]: Party.ts
[pro]: Proposal.ts
[tag]: Tag.ts
[tok]: Token.ts

## Set Types

These types allow special sets of core data types to be described.

| File Entry           | Description                                           |
|:---------------------|:------------------------------------------------------|
| [`PartySet.ts`][pas] | Identifies one, some or all available parties.        |
| [`TokenSet.ts`][tos] | Identifies a logical set of [`Token`s][tok].          |

[pas]: PartySet.ts
[tos]: TokenSet.ts

## Query Types

These types are used solely for specifying which core type instances are desired
of all such known by some AHF Broker.

| File Entry                 | Description                                     |
|:---------------------------|:------------------------------------------------|
| [`Query.ts`][que]          | Data interface inherited by query types.        |
| [`ExchangeQuery.ts`][exq]  | A request for [`Exchange`s][exc].               |
| [`OwnershipQuery.ts`][owq] | A request for [`Ownership`s][own].              |
| [`TagQuery.ts`][Taq]       | A request for [`Tag`s][tag].                    |
| [`TokenQuery.ts`][Toq]     | A request for [`Token`s][tok].                  |

[que]: Query.ts
[exq]: ExchangeQuery.ts
[owq]: OwnershipQuery.ts
[Taq]: TagQuery.ts
[Toq]: TokenQuery.ts

## Query Result Types

These primitives are used to hold the results of requests for core type
instances.

| File Entry                     | Description                                     |
|:-------------------------------|:------------------------------------------------|
| [`ResultSet.ts`][res]          | Data interface inherited by query result types. |
| [`ExchangeResultSet.ts`][exr]  | A query result of [`Exchange`s][exc].           |
| [`OwnershipResultSet.ts`][owr] | A query result of [`Ownership`s][own].          |
| [`TagResultSet.ts`][tar]       | A query result of [`Tag`s][tag].                |
| [`TokenResultSet.ts`][tor]     | A query result of [`Token`s][tok].              |

[res]: ResultSet.ts
[exr]: ExchangeResultSet.ts
[owr]: OwnershipResultSet.ts
[tar]: TagResultSet.ts
[tor]: TokenResultSet.ts