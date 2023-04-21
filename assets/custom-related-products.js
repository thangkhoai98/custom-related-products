// Get related products & apply slick carousel
$(document).ready(function(){
  let $container = $(".custom-related-products")
  $productList = $container.find('.section-products')
  $.get(`/recommendations/products.json?product_id=${$productList.attr("data-product-id")}&limit${$productList.attr("data-product-limit")}=&intent=related`, function(data){
    if (data.products.length > 0) {
      let html = "";
      for (let i = 0; i < data.products.length; i++) {
        let product_featured_image = data.products[i].featured_image ? data.products[i].featured_image : "https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png?format=webp&v=1530129081";
        let product_second_image = data.products[i].images.length > 1 && data.products[i].images[1] ? `<img class='product-img second-img' src='${data.products[i].images[1]}'>` : '' ;
        let product_price = $productList.attr("data-money-format").replace("{{amount_no_decimals_with_comma_separator}}", data.products[i].price / 100);
        html += `
          <div class='product-card'>
            <a class='product-link' href='${data.products[i].url}'>
              <div class='product-image'>
                ${product_second_image ? product_second_image : ''}
                <img class='product-img first-img' src='${product_featured_image}'>
              </div>
              <div class='product-title'>
                <h3 class='product-title-content h5'>
                  ${data.products[i].title}
                </h3>
              </div>
              <div class='product-price'>
                <span class='product-price-content'>
                  ${product_price}
                </span>
              </div>
            </a>
          </div>
        `
      }
      $productList.html(html)
      $(".custom-related-products .section-products").slick({
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        nextArrow: "<svg aria-hidden='true' focusable='false' class='arrow-icon arrow-icon-next' viewBox='0 0 10 6'><path fill-rule='evenodd' clip-rule='evenodd' d='M9.354.646a.5.5 0 00-.708 0L5 4.293 1.354.646a.5.5 0 00-.708.708l4 4a.5.5 0 00.708 0l4-4a.5.5 0 000-.708z' fill='currentColor'></path></svg>",
        prevArrow: "<svg aria-hidden='true' focusable='false' class='arrow-icon arrow-icon-prev' viewBox='0 0 10 6'><path fill-rule='evenodd' clip-rule='evenodd' d='M9.354.646a.5.5 0 00-.708 0L5 4.293 1.354.646a.5.5 0 00-.708.708l4 4a.5.5 0 00.708 0l4-4a.5.5 0 000-.708z' fill='currentColor'></path></svg>",
        responsive: [
          {
            breakpoint: 992,
            settings: {
              slidesToShow: 3
            }
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 2
            }
          }
        ]
      });
      $container.fadeIn();
    }
  });
});