export const validateEmail = (email) => {
  const regextSt =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regextSt.test(email);
};

export const validateCreateProduct = (product, images) => {
  let sizes = product.sizes;
  let dettails = product.dettails;
  let questions = product.questions;
  const checks = [
    {
      msg: 'Name, Description, Brand added successfully.',
      type: 'success',
    },
  ];
  if (images.length < 6) {
    checks.push({
      msg: `Choose atleast 6 images (${6 - images.length} remaining).`,
      type: 'error',
    });
  } else {
    checks.push({
      msg: `6 images choosen.`,
      type: 'success',
    });
  }
  if (!product.color.color) {
    checks.push({
      msg: `Choose a main product color.`,
      type: 'error',
    });
  } else {
    checks.push({
      msg: `Product color been choosen.`,
      type: 'success',
    });
  }
  return checks;
};
