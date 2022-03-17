import type { NextApiRequest, NextApiResponse } from 'next';
import { PreviewData } from 'next';
import { NextApiRequestCookies } from 'next/dist/server/api-utils';
import { GetServerSidePropsResult } from 'next/types';
import { ParsedUrlQuery } from 'querystring';

export type CustomGetServerSideProps<
  P extends { [key: string]: any } = { [key: string]: any },
  Q extends ParsedUrlQuery = ParsedUrlQuery
> = (
  context: GetServerSidePropsContext<Q>
) => Promise<GetServerSidePropsResult<P>>;

export type GetServerSidePropsContext<
  Q extends ParsedUrlQuery = ParsedUrlQuery
> = {
  req: NextApiRequest & {
    cookies: NextApiRequestCookies;
  };
  res: NextApiResponse;
  params?: Q;
  query: ParsedUrlQuery;
  preview?: boolean;
  previewData?: PreviewData;
  resolvedUrl: string;
  // locale: string; // This is where the magic happens.
  // locales?: string[];
  // defaultLocale?: string;
};
