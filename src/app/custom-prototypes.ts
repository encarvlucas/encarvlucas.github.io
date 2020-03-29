export { }; // this will make it module

declare global { // this is important to access it as global type String

    interface String {
        trimWhiteSpaces(): string;
    }

    interface Array<T> {
        last(): T;
    }
}
if (!String.prototype.trimWhiteSpaces) {
    String.prototype.trimWhiteSpaces = function() {
        return this.replace(/ +/g, "");
    };
}

// if (!Array.prototype.last) {
    Array.prototype.last = function() {
        return this[this.length - 1];
    };
// }
