const Validator = require('./Validator');
const Model = require('./Model');


class Controller {

    constructor() {
        this.form = document.querySelector('form');
        this.initInputs(['email', 'fio', 'phone']);
        this.form.addEventListener('submit', (event) => {
            event.preventDefault();
            this.submit();
        });
        this.result = this.form.querySelector('#resultContainer')
    }

    initInputs(arr) {
        this.inputs = {};
        arr.forEach(item => {
            this.inputs[item] = this.form.querySelector(`input[name=${item}]`)
        })
    }

    handleResponse(obj) {
        this.result.className = '';
        if (obj.status !== "progress") {
            this.form.querySelector('button').removeAttribute('disabled');
        }
        /**
         * if error was throw by fetch in promise we still must handle it
         * like server received error. Here it is
         */
        if (obj instanceof Error) {
            obj.status = "error";
            obj.reason = obj.message;
        }
        switch(obj.status) {
            case 'success':
                this.result.classList.add('success');
                this.result.innerText = 'Success';
                break;
            case 'error':
                this.result.classList.add('error');
                this.result.innerText = obj.reason;
                break;
            case 'progress':
                this.result.classList.add('progress');
                setTimeout(() => this.submit(), parseInt(obj.timeout));
                break;
        }
    }

    submit() {
        this.result.innerText = '';
        // clear previous check
        Object.keys(this.inputs).map(i => this.inputs[i].classList.remove('error'));
        const form = this.validate();
        if (form.isValid) {
            this.form.querySelector('button').setAttribute('disabled', 'true');
            Model.send(this.form.getAttribute('action'), new FormData(this.form))
                .then(r => this.handleResponse(r)) // save this context
                .catch(e => this.handleResponse(e));
        } else {
            form.errorFields.forEach(item => {
                this.inputs[item].classList.add('error');
            })
        }
    }

    getData() {
        const result = {};
        Object.keys(this.inputs).map(key => {
            result[key] = this.inputs[key].value;
        });
        return result;
    }

    setData(obj) {
        Object.keys(obj).map(key => {
           if (typeof this.inputs[key] !== 'undefined') {
               this.inputs[key].value = obj[key];
           }
        });
    }

    validate() {
        const errors = [];
        const handleError = ({message}, name) => {
            console.log(message);
            errors.push(name);
        };
        /**
         * cleans elem value from spaces on page and returns el
         * @param el
         * @returns {*}
         */
        const trimAdvanced = (el) => {
            el.value = el.value.trim().replace(/\s+/g, ' ');
            return el;
        };
        Object.keys(this.inputs).map(key => {
            try {
                if (typeof Validator[key] !== 'undefined') {
                    Validator[key](trimAdvanced(this.inputs[key]).value)
                }
            } catch (e) {
                handleError(e, key);
            }
        });
        return {
            isValid: errors.length === 0,
            errorFields: errors
        }
    }


}

document.addEventListener('DOMContentLoaded', () =>
    window.myForm = new Controller()
);