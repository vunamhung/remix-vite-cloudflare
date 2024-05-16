import { json } from '@remix-run/cloudflare';
import { omit } from 'ramda';
import { http0 } from '~/utilities/.server';

const init = { headers: { 'Cache-Control': 'public, max-age=300' } };

export async function getPage(slug: string, locale = 'en') {
  const { data } = await http0.get<iRawPage[]>('/wp/v2/pages', { params: { slug, __embed: true, acf_format: 'standard', lang: locale } });

  if (data?.[0]?.acf?.blocks) {
    const posts: any[] = [];
    if (data?.[0]?.acf?.blocks?.find(({ acf_fc_layout }) => ['news', 'news_center'].includes(acf_fc_layout))) {
      const data = (await getPosts(locale)) as unknown as iRawPost[];
      for (const { title, excerpt, link, _embedded } of data) {
        posts.push({
          title: title.rendered,
          excerpt: excerpt.rendered,
          link,
          featured_media: _embedded?.['wp:featuredmedia']?.[0]?.media_details?.sizes?.medium_large?.source_url,
        });
      }
    }
    return json(
      {
        blocks: data?.[0]?.acf?.blocks?.map((item) => {
          if (['news', 'news_center'].includes(item.acf_fc_layout)) return { ...item, items: posts };
          return item;
        }),
        title: data?.[0]?.title.rendered,
        yoast_head_json: omit(['schema', 'og_url'], data?.[0]?.yoast_head_json),
      },
      init,
    );
  }

  return null;
}

export async function getPosts(locale = 'en') {
  const { data } = await http0.get('/wp/v2/posts', { params: { __embed: true, acf_format: 'standard', lang: locale } });
  if (data) return json(data, init);
  return null;
}
