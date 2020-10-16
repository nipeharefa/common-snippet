import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

const Codeblock = (props) => {
  const { value } = props;
  console.log(value)
  return (
    <SyntaxHighlighter language="php">
      {value}
    </SyntaxHighlighter>
  );
};


export default Codeblock;
