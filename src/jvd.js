class _JVD {
    constructor() {
        class State {
            constructor(value, dependencices=[], watchers={}, accessor=[]) {
                // the value that is passed in the use State
                this.value = value; 
                // dependencies are States that has been used to access a
                // child value
                this.dependencices = dependencices;
                // watchers of the value, child value would call parent update function 
                this.watchers = watchers;
                // accessor array is the list of accessor used to access your child value
                this.accessor = accessor;
            }
            // State accessors
            valueOf() { return this.value; }
            toString() { return this.value.toString(); }
        }
        this.State = State;

        this.useState = (value, dependencices=[], watchers={}, accessor=[]) => {
            let x = this;
            let y = this.State;
            let z = this.useState;
            
            
        }
    }
}

const JVD = new _JVD();