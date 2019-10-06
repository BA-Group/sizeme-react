const general = {
    disableSizeGuide: false,
    toggler: false
};

const shops = {
    magento: {
        appendContentTo: ".product-options",
        invokeElement: "select.super-attribute-select",
        invokeEvent: "change",
        addToCartElement: "button.btn-cart",
        addToCartEvent: "click",
        firstRecommendation: true,
        sizeSelectorType: "default"
    },
    woocommerce: {
        appendContentTo: ".sizeme-container",
        invokeElement: ".sizeme-selection-container select",
        invokeEvent: "change",
        addToCartElement: "button.single_add_to_cart_button",
        addToCartEvent: "click",
        firstRecommendation: true,
        sizeSelectorType: "default"
    },
    vilkas: {
        appendContentTo: ".PriceContainer",
        invokeElement: "#SelectedVariation0",
        invokeEvent: "change",
        addToCartElement: "button.AddToBasketButton",
        addToCartEvent: "click",
        firstRecommendation: true,
        sizeSelectorType: "default"
    }
};

export default (sizemeOptions => {
    if (sizemeOptions) {
        return Object.assign({ shopType: sizemeOptions.shopType }, general,
            shops[sizemeOptions.shopType], sizemeOptions.uiOptions);
    } else {
        return {};
    }
})(window.sizeme_options);
