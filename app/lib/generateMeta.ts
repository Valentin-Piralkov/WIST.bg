export function generateMeta(title: string, description: string, imageURL: string, url: string) {
  return [
    { title },
    {
      name: "description",
      content: description
    },
    {
      property: "og:url",
      content: url
    },
    {
      property: "og:type",
      content: "website"
    },
    {
      property: "og:title",
      content: title
    },
    {
      property: "og:description",
      content: description
    },
    {
      property: "og:image",
      content: imageURL
    },
    {
      property: "twitter:card",
      content: "summary_large_image"
    },
    {
      property: "twitter:domain",
      content: "alimco.bg"
    },
    {
      property: "twitter:url",
      content: url
    },
    {
      property: "twitter:title",
      content: title
    },
    {
      property: "twitter:description",
      content: description
    },
    {
      property: "twitter:image",
      content: imageURL
    }
  ];
}
