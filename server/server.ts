const fetchCarouselData = () =>
  fetch('/carousel')
    .then((response) => response.json())
    .catch((error) => console.error(error));

const fetchProductData = () =>
  fetch('/products')
    .then((response) => response.json())
    .catch((error) => console.error(error));

const postItemData = (item: object) =>
  fetch('/products', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(item),
  }).catch((error) => console.error(error));

const editItemData = (item: object, index: number) =>
  fetch('/products/' + index, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(item),
  })
    .then((response) => response.json())
    .catch((error) => console.error(error));

const deleteItemData = (index: number) =>
  fetch('/products/' + index, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .catch((error) => console.error(error));

export {
  fetchCarouselData,
  fetchProductData,
  postItemData,
  editItemData,
  deleteItemData,
};
