import { dishesConst } from "./dishesConst"

/* 
   The Model keeps the state of the application (Application State). 
   It is an abstract object, i.e. it knows nothing about graphics and interaction.
*/
export const model = {
  numberOfGuests: 2,
  dishes: [],
  currentDishId: null, // null means "intentionally empty"

  setCurrentDishId(dishId) {
    this.currentDishId = dishId
  },

  setNumberOfGuests(number) {
    if (!Number.isInteger(number) || number < 1)
      throw new Error("number of guests not a positive integer")
    this.numberOfGuests = number
  },

  addToMenu(dishToAdd) {
    // array spread syntax exercise
    // It sets this.dishes to a new array [   ] where we spread (...) the elements of the existing this.dishes
    this.dishes = [...this.dishes, dishToAdd]
  },

  // filter callback exercise
  removeFromMenu(dishToRemove) {
    function shouldWeKeepDishCB(dish) {
      return dish.id !== dishToRemove.id
    }
    this.dishes = this.dishes.filter(shouldWeKeepDishCB)
  },

  // more methods will be added here, don't forget to separate them with comma!
}
