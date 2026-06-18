import React from 'react';
import { render, screen } from '@testing-library/react';
import ResponseItem from './SearchResponseList';

describe('ResponseItem component', () => {
  const mockResponse = {
    results: [
      {
        document: {
          id: "doc-1",
          name: "projects/123/locations/global/collections/default_collection/dataStores/ds-1/branches/0/documents/doc-1",
          derivedStructData: {
            title: "Document One Title"
          }
        }
      },
      {
        document: {
          id: "doc-2",
          name: "projects/123/locations/global/collections/default_collection/dataStores/ds-1/branches/0/documents/doc-2",
          derivedStructData: {
            title: "Document Two Title"
          }
        }
      }
    ],
    summary: {
      summaryWithMetadata: {
        references: [
          {
            document: "projects/123/locations/global/collections/default_collection/dataStores/ds-1/branches/0/documents/doc-1",
            title: "Document One Title",
            chunkContents: [
              {
                pageIdentifier: "1",
                content: "Unique content for doc-1 page 1"
              }
            ]
          },
          {
            document: "projects/123/locations/global/collections/default_collection/dataStores/ds-1/branches/0/documents/doc-2",
            title: "Document Two Title",
            chunkContents: [
              {
                pageIdentifier: "5",
                content: "Unique content for doc-2 page 5"
              }
            ]
          }
        ]
      }
    }
  };

  test('only renders matching references for each specific document card', () => {
    const { container } = render(<ResponseItem response={mockResponse} />);

    // Get all document card elements (each result item is rendered inside a block container)
    // In our component structure, each item gets mapped inside getItem():
    // <div className="block bg-white rounded-md p-4 w-full mb-8">
    const cards = container.querySelectorAll('.block.bg-white');
    expect(cards).toHaveLength(2);

    // Verify first document card content
    expect(cards[0]).toHaveTextContent('Document One Title');
    expect(cards[0]).toHaveTextContent('Unique content for doc-1 page 1');
    expect(cards[0]).not.toHaveTextContent('Unique content for doc-2 page 5');

    // Verify second document card content
    expect(cards[1]).toHaveTextContent('Document Two Title');
    expect(cards[1]).toHaveTextContent('Unique content for doc-2 page 5');
    expect(cards[1]).not.toHaveTextContent('Unique content for doc-1 page 1');
  });
});
