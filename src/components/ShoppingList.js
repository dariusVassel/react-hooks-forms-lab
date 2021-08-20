import React, { useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";
import { v4 as uuid } from "uuid";

function ShoppingList({ items }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchWord, setSearchWord] = useState("")
  const [submittedProduct, setSubmittedProduct] = useState("")
  const [selectedProduct, setSelectedProduct] = useState("Produce")
  const [submittedData, setSubmittedData] = useState([]);


  function handleSearch(e) {
    //console.log(e.target.value)
    setSearchWord(e.target.value)
    console.log(searchWord)
  }

  function handleSelect(e) {
    console.log("SELECTED")
    setSelectedProduct(e.target.value)
  }

  function handleFormChange(e) {
    console.log(e.target.value)
    setSubmittedProduct(e.target.value)

  }

  function handleSubmit(e) {
    e.preventDefault()
    console.log('SUCCESS')
    const productData = { id: uuid(), name: submittedProduct, category: selectedProduct }
    const dataArray = [...submittedData, productData]
    setSubmittedData(dataArray)
    setSelectedProduct("Produce")
    items.push(productData)
  }

  console.log(items)

  function handleCategoryChange(event) {
    setSelectedCategory(event.target.value);
  }

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  })
    .filter(item => item.name.toLowerCase().includes(searchWord.toLowerCase()))


  return (
    <div className="ShoppingList">
      <ItemForm onItemFormSubmit={handleSubmit} onFormChange={handleFormChange} onSelectChange={handleSelect} />
      <Filter onCategoryChange={handleCategoryChange} onSearchChange={handleSearch} />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} name={item.name} category={item.category} />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
