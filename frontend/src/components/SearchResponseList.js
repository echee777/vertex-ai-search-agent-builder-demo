import parse from "html-react-parser";

/**
 * Renders a single response item from the search results.
 *
 * @param {object} props The props object containing the response data.
 * @param {object} props.response The search response object.
 * @returns {JSX.Element} The JSX element representing the response item.
 */
const ResponseItem = (props) => {
  console.log("API pass as props", props.response);
  return (
    <div className="bg-gray rounded-md p-4 w-full mb-8">
      <div className="flex-col overflow-y-auto items-center justify-center">
        {props.response.results &&
          props.response.results.map((item, index) => {
            return getItem(item, props.response, index);
          })}
      </div>
    </div>
  );
};

/**
 * Renders a single item from the search results.
 *
 * @param {object} item The search result item.
 * @param {object} response The search response object.
 * @returns {JSX.Element} The JSX element representing the item.
 */
function getItem(item, response, index) {
  const title = item.document?.derivedStructData?.title || item.document?.structData?.title || item.document?.id || "Untitled Document";
  
  // Find the reference specific to this document instead of duplicating the global list [0]
  const docReference = response?.summary?.summaryWithMetadata?.references?.find(
    (ref) =>
      (item.document?.name && ref.document === item.document.name) ||
      (ref.title === title) ||
      (item.document?.id && ref.document?.endsWith(`/documents/${item.document.id}`))
  );
  const references = docReference?.chunkContents;
  
  const snippets = item.document?.derivedStructData?.snippets;
  const extractiveAnswers = item.document?.derivedStructData?.extractive_answers;
  const extractiveSegments = item.document?.derivedStructData?.extractive_segments;

  return (
    <div className="block bg-white rounded-md p-4 w-full mb-8" key={item.document?.id || index}>
      {getFileName(title)}
      {references && getReferences(references)}
      {snippets && getSnippets(snippets)}
      {extractiveAnswers && getExtractiveAnswer(extractiveAnswers)}
      {extractiveSegments && getExtractiveSegments(extractiveSegments)}
    </div>
  );
}

/**
 * Renders the file name from the document title.
 *
 * @param {string} docTitle The document title.
 * @returns {JSX.Element} The JSX element representing the file name.
 */
function getFileName(docTitle) {
  const titleStr = docTitle ? docTitle.toString() : "";
  return (
    <h3 className="text-md font-medium mb-2 text-sky-900">
      from:{" "}
      {titleStr.includes("docs/")
        ? titleStr.split("/")[1]
        : titleStr}
    </h3>
  );
}

/**
 * Renders the references from the search response.
 *
 * @param {array} referenceItems The array of reference items.
 * @returns {JSX.Element} The JSX element representing the references.
 */
function getReferences(referenceItems) {
  return (
    <div className="block mt-2 mb-2">
      <h1 className="text-md font-bold">References</h1>
      <div className="block ">
        {referenceItems &&
          referenceItems.map((item, index) => {
            return (
              <div className="block mb-2" key={index}>
                <h1 className="text-xs font-medium text-violet-900">
                  page {item.pageIdentifier}
                </h1>
                <h1 className="text-sm">{item.content}</h1>
              </div>
            );
          })}
      </div>
    </div>
  );
}

/**
 * Renders the snippets from the search response.
 *
 * @param {array} snippetItems The array of snippet items.
 * @returns {JSX.Element} The JSX element representing the snippets.
 */
function getSnippets(snippetItems) {
  return (
    <div className="block mt-2 mb-2">
      <h1 className="text-md font-bold">Snippets</h1>
      {snippetItems &&
        snippetItems.map((item, index) => {
          return (
            <div className="block mb-2" key={index}>
              <h1 className="text-sm prose">{parse(item.snippet)}</h1>
            </div>
          );
        })}
    </div>
  );
}

/**
 * Renders the extractive answers from the search response.
 *
 * @param {array} extractiveAnswerItems The array of extractive answer items.
 * @returns {JSX.Element} The JSX element representing the extractive answers.
 */
function getExtractiveAnswer(extractiveAnswerItems) {
  return (
    <div className="block mt-2 mb-2">
      <h1 className="text-md font-bold">Extractive Answers</h1>
      <div className="block mb-2">
        {extractiveAnswerItems &&
          extractiveAnswerItems.map((item, index) => {
            return (
              <div className="block" key={index}>
                <h1 className="text-xs font-medium text-orange-700">
                  page {item.pageNumber}
                </h1>
                <h1 className="text-sm">{item.content}</h1>
              </div>
            );
          })}
      </div>
    </div>
  );
}

/**
 * Renders the extractive segments from the search response.
 *
 * @param {array} extractiveSegmentItems The array of extractive segment items.
 * @returns {JSX.Element} The JSX element representing the extractive segments.
 */
function getExtractiveSegments(extractiveSegmentItems) {
  return (
    <div className="block mt-2 mb-2">
      <h1 className="text-md font-bold">Extractive Segments</h1>
      <div className="block mb-2">
        {extractiveSegmentItems &&
          extractiveSegmentItems.map((item, index) => {
            return (
              <div className="block mb-2" key={index}>
                <div className="flex justify-between">
                  <h1 className="text-xs font-medium text-orange-700">
                    page {item.pageNumber}
                  </h1>
                  <h1 className="text-xs font-medium text-green-800">
                    relevance score: {item.relevanceScore != null ? Number(item.relevanceScore).toFixed(2) : "N/A"}
                  </h1>
                </div>
                <h1 className="text-sm">{item.content}</h1>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default ResponseItem;
