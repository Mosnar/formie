import { eventKey } from '../utils/utils';

export class FormieCheckboxRadio {
    constructor(settings = {}) {
        this.$form = settings.$form;
        this.form = this.$form.form;
        this.$field = settings.$field;

        if (this.$field) {
            this.initInputs();
            this.initRequiredCheckboxes();
        }
    }

    initInputs() {
        const $inputs = this.$field.querySelectorAll('[type=checkbox], [type=radio]');

        $inputs.forEach(($input) => {
            this.form.addEventListener($input, eventKey('click'), (e) => {
                if (e.target.checked) {
                    if (e.target.getAttribute('type') === 'radio') {
                        const inputName = e.target.getAttribute('name');
                        const $radioButtons = this.$field.querySelectorAll('[name="' + inputName + '"] ');

                        $radioButtons.forEach(($radioButton) => {
                            $radioButton.removeAttribute('checked');
                            $radioButton.setAttribute('aria-checked', false);
                        });
                    }

                    e.target.setAttribute('checked', true);
                    e.target.setAttribute('aria-checked', true);
                } else {
                    e.target.removeAttribute('checked');
                    e.target.setAttribute('aria-checked', false);
                }
            }, false);
        });
    }

    initRequiredCheckboxes() {
        const $checkboxInputs = this.$field.querySelectorAll('[type="checkbox"]');

        $checkboxInputs.forEach(($checkboxInput) => {
            this.form.addEventListener($checkboxInput, eventKey('change'), (e) => {
                this.onCheckboxChanged($checkboxInputs, this.isChecked($checkboxInputs));
            }, false);

            // For any checked fields, trigger this event now
            if ($checkboxInput.checked) {
                $checkboxInput.dispatchEvent(new Event('change', { bubbles: true }));
            }
        });
    }

    isChecked($checkboxInputs) {
        for (let i = 0; i < $checkboxInputs.length; i++) {
            if ($checkboxInputs[i].checked) {
                return true;
            }
        }

        return false;
    }

    onCheckboxChanged($checkboxInputs, checked) {
        $checkboxInputs.forEach(($checkboxInput) => {
            if (checked) {
                $checkboxInput.removeAttribute('required');
                $checkboxInput.setAttribute('aria-required', false);
            } else {
                $checkboxInput.setAttribute('required', true);
                $checkboxInput.setAttribute('aria-required', true);
            }
        });
    }
}

window.FormieCheckboxRadio = FormieCheckboxRadio;
