import type { GetCategoriesResponse, GetJokeResponse } from '@/lib/jokes/types';
import { sleep } from '@/utils';

const JOKES_API_BASE_URL = 'https://v2.jokeapi.dev';
const USE_REQUEST_THROTTLE = true;

class JokesHttpClient {
  public async getCategories() {
    const response = await this.request<GetCategoriesResponse>('GET', '/categories');

    if (!response) {
      return null;
    }

    return response.categories;
  }

  public async getJoke(categories: string[]) {
    const categoriesParam = categories.join(',');
    const url = new URL(categoriesParam, '/joke');

    const response = await this.request<GetJokeResponse>('GET', url.toString());

    if (!response) {
      return null;
    }

    return response;
  }

  private async request<T = any>(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    url: string,
    data?: any,
  ): Promise<T | null> {
    try {
      const targetUrl = new URL(url, JOKES_API_BASE_URL);

      await this.throttle();

      const response = await fetch(targetUrl, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(data),
      });

      return await response.json();
    } catch (error) {
      console.error('Failed to send request to Jokes API', error);
      return null;
    }
  }

  private async throttle() {
    if (!USE_REQUEST_THROTTLE) return;
    await sleep(1000);
  }
}

export const jokesHttpClient = new JokesHttpClient();
