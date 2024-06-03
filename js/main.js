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

function analyzeComponent(html, json) {
  //   if (!json.children) {
  //     return;
  //   }

  const tagName = html.tagName.toLowerCase();

  console.log(html.tagName);
  console.log(html.children);
  console.log(html);
  console.log(json.tag);

  console.log(json.tag.includes(tagName));

  const childArr = Array.from(html.children);

  if (childArr) {
    childArr.forEach((child, index) => {
      console.log(child);
      console.log(json.children[index]);

      analyzeComponent(child, json.children[index]);
    });
  }
}

const oeuvreCards = document.getElementsByClassName("oeuvre-card");

Array.from(oeuvreCards).forEach((card) => {
  analyzeComponent(card, oeuvreCardJson);
});
