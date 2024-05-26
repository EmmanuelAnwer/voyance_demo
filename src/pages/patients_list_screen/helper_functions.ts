import { FilterState, filtersInitialState } from "./state_mangement/filters_slice";

/**
 * Checks if the filters's name has been changed.
 * 
 * It gets the default value of the filter's name and the current value of the filters's name and compare them with each other.
 * 
 * @param filters   FilterState    Object contains the current values of the filters 
 * 
 * @returns {Boolean} Return true if the name changed and false if not
 */
export function isNameChanged(filters: FilterState): Boolean{
    return filters.name != filtersInitialState.name;
}

/**
 * Checks if the filters's age has been changed.
 * 
 * It gets the default value of the filter's age and the current value of the filters's age and compare them with each other.
 * 
 * @param filters   FilterState    Object contains the current values of the filters 
 * 
 * @returns {Boolean} Return true if the age changed and false if not
 */
export function isAgeChanged(filters: FilterState): Boolean{
    return filters.age[0] != filtersInitialState.age[0] || filters.age[1] != filtersInitialState.age[1];
}

/**
 * Checks if the filters's gender has been changed.
 * 
 * It gets the default value of the filter's gender and the current value of the filters's gender and compare them with each other.
 * 
 * @param filters FilterState Object contains the current values of the filters 
 * 
 * @returns {Boolean} Return true if the gender changed and false if not
 */
export function isGenderChanged(filters: FilterState){
    return filters.gender != filtersInitialState.gender;
}

/**
 * Checks if the any of the filters has been changed.
 * 
 * It gets the default value of the filters and the current value of the filters and compare them with each other.
 * 
 * @param filters FilterState Object contains the current values of the filters 
 * 
 * @returns {Boolean} Return true if the any field of the filters has been changed changed and false if not
 */
export function isFiltersChanged(filters: FilterState){
    return isNameChanged(filters) ||  isAgeChanged(filters) || isGenderChanged(filters);
}
