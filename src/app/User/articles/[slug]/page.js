import ContentRenderer from '@/components/ArticleBlocks/ContentRenderer';
import FaqRenderer from '@/components/ArticleBlocks/FaqRenderer';

export default async function ArticlePage({ params }) {
  const res = await fetch(`http://localhost:3000/api/articles/${params.slug}`, {
    cache: 'no-store'
  });

  const article = await res.json();

  return (
    <div className="max-w-3xl mx-[12%] p-6 flex-col items-start">
      <h1 className="text-4xl font-bold mb-2 mt-10">{article.title}</h1>
      <p className="text-sm text-gray-500 mb-6 font-sans">- By {article.author}</p>
      <ContentRenderer contentBlocks={article.content_blocks} />
      <FaqRenderer faq={article.faq} />
    </div>
  );
}
