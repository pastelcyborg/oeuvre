const oeuvreCardJson = {
  tag: ["div"],
  children: [
    {
      tag: ["h3"],
    },
    {
      tag: ["p"],
    },
  ],
};

const oeuvreCardNoPaddingJson = {
  tag: ["div"],
  children: [
    {
      tag: ["img"],
    },
    {
      tag: ["div"],
      children: [
        {
          tag: ["h3"],
        },
        {
          tag: ["p"],
        },
      ],
    },
    {
      tag: ["hr"],
    },
    {
      tag: ["div"],
    },
  ],
};

function errorHighlightComponent(componentHtml) {
  componentHtml.classList.add("error-highlight");
}

function analyzeComponent(componentHtml, jsonFragment, childHtml) {
  const currentElTagName = childHtml
    ? childHtml.tagName.toLowerCase()
    : componentHtml.tagName.toLowerCase();

  console.log("currentElTagName:", currentElTagName);

  // JSON object for this child fragment either doesn't exist or doesn't contain
  // the right keys; likely due to mismatch between number of DOM children and
  // number of JSON children
  if (!jsonFragment || !jsonFragment.tag) {
    console.error("JSON config mismatch with component:", componentHtml);

    errorHighlightComponent(componentHtml);

    return;
  }

  // Current top-level HTML element is not one of those allowed via the options
  // in its matched JSON config
  if (!jsonFragment.tag.includes(currentElTagName)) {
    console.error(
      currentElTagName,
      "is not allowed at this location in component:",
      componentHtml
    );

    errorHighlightComponent(componentHtml);

    return;
  }

  console.log("componentHtml:", componentHtml);
  console.log("childHtml:", childHtml);

  const childElArr = childHtml
    ? Array.from(childHtml.children)
    : Array.from(componentHtml.children);

  console.log("childElArr:", childElArr);

  if (childElArr && childElArr.length) {
    childElArr.forEach((childEl, index) => {
      console.log("childEl:", childEl);

      if (jsonFragment.children && jsonFragment.children.length) {
        console.log("jsonFragment.children:", jsonFragment.children);
        console.log(
          "jsonFragment.children[index]:",
          jsonFragment.children[index]
        );

        analyzeComponent(componentHtml, jsonFragment.children[index], childEl);
      }
    });
  }

  return;
}

const oeuvreCards = document.getElementsByClassName("oeuvre-card");

Array.from(oeuvreCards).forEach((card) => {
  analyzeComponent(card, oeuvreCardJson);
});

const oeuvreCardsNoPadding = document.getElementsByClassName(
  "oeuvre-card-no-padding"
);

Array.from(oeuvreCardsNoPadding).forEach((card) => {
  analyzeComponent(card, oeuvreCardNoPaddingJson);
});

const stupidTest = document.getElementsByClassName("stupid-test");

Array.from(stupidTest).forEach((card) => {
  analyzeComponent(card, oeuvreCardJson);
});
