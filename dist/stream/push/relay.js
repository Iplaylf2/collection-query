"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.relay = void 0;
const type_1 = require("./type");
const create_1 = require("./create");
function relay(handler) {
    return (receiver) => {
        let cancel_early = false;
        let source_cancel = function () {
            cancel_early = true;
        };
        const relay_emitter = create_1.create((emit) => {
            if (cancel_early) {
                return;
            }
            source_cancel = handler(emit);
        });
        const relay_receiver = function (t, x) {
            if (t !== type_1.EmitType.Next) {
                source_cancel();
            }
            receiver(t, x);
        };
        const relay_cancel = relay_emitter(relay_receiver);
        const cancel = function () {
            relay_cancel();
            source_cancel();
        };
        return cancel;
    };
}
exports.relay = relay;
