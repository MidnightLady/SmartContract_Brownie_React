// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;
contract C {
    function f(uint8 a, uint8 b) pure public returns (uint8) {
        // This subtraction will wrap on underflow.
        unchecked { return a - b; }
    }
//    function g(uint8 a, uint8 b) pure public returns (uint8) {
//        // This subtraction will revert on underflow.
//        return a - b;
//    }*
}