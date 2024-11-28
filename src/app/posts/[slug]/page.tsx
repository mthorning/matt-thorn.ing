import { notFound } from "next/navigation";
import { getPostBySlug } from "../utils";

import { remark } from "remark";
import html from "remark-html";

export default async function Post(props: Params) {
  const params = await props.params;
  const post = getPostBySlug(params.slug);

  if (!post) {
    return notFound();
  }

  const result = await remark().use(html).process(post.content ?? '');
  const content = result.toString();

  return (
    <main
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}

type Params = {
  params: Promise<{
    slug: string;
  }>;
};

