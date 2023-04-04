//#region Constants
//-----------//
// Constants //
//-----------//

// const ATTR_*
//#region Attribute Names
const ATTR_CLASS = 'class';
//#endregion Attribute Names

// const EL_*
//#region Element Names
const EL_BUTTON = 'button';
const EL_OPTION = 'option';
const EL_SELECT = 'select';
const EL_TABLE = 'table';
const EL_TD = 'td';
const EL_TH = 'th';
const EL_TR = 'tr';
//#endregion Element Names

//#endregion Constants

class ElementFactory {
    static newButton(innerText = null, classAttrValue = null) {
        return this.#newElement(EL_BUTTON, innerText, classAttrValue);
    }

    static newSelectOption(innerText) {
        return this.#newElement(EL_OPTION, innerText);
    }

    static newSelectDropdown(classAttrValue = null) {
        return this.#newElement(EL_SELECT, this.NO_INNER_TEXT, classAttrValue);
    }

    static newTable(classAttrValue = null) {
        return this.#newElement(EL_TABLE, this.NO_INNER_TEXT, classAttrValue);
    }

    static newTDCell(innerText = null, classAttrValue = null) {
        return this.#newElement(EL_TD, innerText, classAttrValue);
    }

    static newTableHeaderCell(innerText = null, classAttrValue = null) {
        return this.#newElement(EL_TH, innerText, classAttrValue);
    }

    static newTRow(classAttrValue = null) {
        return this.#newElement(EL_TR, this.NO_INNER_TEXT, classAttrValue);
    }

    static #_NO_INNER_TEXT = null;
    static get NO_INNER_TEXT() { return this.#_NO_INNER_TEXT; }

    static #newElement(tag, innerText, classAttrValue = null) {
        const element = document.createElement(tag);

        if (classAttrValue) {
            element.setAttribute(ATTR_CLASS, classAttrValue);
        }

        if (innerText) {
            element.innerText = innerText;
        }

        return element;
    }
}

export { ElementFactory };
