import type { Author } from '../common/interfaces';

export const getAuthors = async (): Promise<Author[]> => {
  const response = await fetch(`${process.env.REACT_APP_API}/authors`);

  return response.json() as unknown as Author[];
};

export const updateAuthor = async (author: Author): Promise<Author> => {
  const response = await fetch(`${process.env.REACT_APP_API}/authors/${author.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(author),
  });

  return response.json() as unknown as Author;
};
