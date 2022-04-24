class Validation {

    rules = {};
    errors = {};

    setRules(rules) {
        this.rules = rules
        return this;
    }

    run(data) {
        for (const field in data) {
            if (field in this.rules) {
                this.callRules(this.rules[field], field, data[field]);
            }
        }
        return !(Object.keys(this.errors).length > 0);
    }

    callRules(rules, field, data) {
        
        const matchs     = rules.split('|');
        const groupRules = new Rules();

        matchs.forEach(match => {
            if (typeof groupRules[match] !== 'function') {
                throw `${match} no es una regla.`;
            }
            if (!groupRules[match](data)) { // run rules
                this.errors[field] = {
                    ...this.errors[field],
                    [match]: this.messages(match)
                }
            }
        });
        
        return this.errors;
    }

    messages(key) {
        const messages = {
            required: 'Requerido mi joven',
            is_number: 'No es un numero mi joven',
            bool: ''
        }
        return messages[key];
    }

    reset() {
        this.errors = {};
    }

    get getErrors() {
        return this.errors;
    }
}

class Rules {

    required(data) {
        return !(data === '');
    }

    is_number(data) {
        return !isNaN(data);
    }

    bool(data) {
        return false;
    }

}

// ===================== CLIENT CODE ============================
const validation = new Validation();
if (!validation
    .setRules({
        amount: 'is_number|required|bool', 
        description: 'required'
    })
    .run({
        amount: "el tre me", 
        description: ""
    })) {
        console.log(validation.getErrors)
        // {   
        //     amount: {
        //       is_number: 'No es un numero mi joven' 
        //     },   
        //     description: { 
        //       required: 'Requerido mi joven' 
        //     }   
        // }
    };
