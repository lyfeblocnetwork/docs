---
id: overview 
title: Architecture Overview
sidebar_label: Overview
---

We started with the idea of making software that is *modular*.

This is something that is present in almost all parts of Lyfebloc Network. Below, you will find a brief overview of the
built architecture and its layering.

## Lyfebloc Network Layering

![Lyfebloc Network Architecture](/Architecture.jpg)

## Libp2p

It all starts at the base networking layer, which utilizes **libp2p**. We decided to go with this technology because it
fits into the designing philosophies of Lyfebloc Network. Libp2p is:

- Modular
- Extensible
- Fast
  
Most importantly, it provides a great foundation for more advanced features, which we'll cover later on.


## Synchronization & Consensus
The separation of the synchronization and consensus protocols allows for modularity and implementation of **custom** sync and consensus mechanisms - depending on how the client is being run.

Lyfebloc Network is designed with an off-the-shelf pluggable Proof of Stake (POS) consensus algorithm.


## Blockchain
The Blockchain layer is the central layer that coordinates everything in Lyfebloc Network system. It is covered in depth in the corresponding *Modules* section.

## State
The State inner layer contains state transition logic. It deals with how the state changes when a new block is included. It is covered in depth in the corresponding *Modules* section.

## JSON RPC
The JSON RPC layer is an API layer that dApp developers use to interact with the blockchain. It is covered in depth in the corresponding *Modules* section.

## TxPool
The TxPool layer represents the transaction pool, and it is closely linked with other modules in the system, as transactions can be added from multiple entry points.

## GRPC
The GRPC layer is vital for operator interactions. Through it, node operators can easily interact with the client, providing an enjoyable UX.