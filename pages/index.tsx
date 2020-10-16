import { useEffect, useState } from "react";
import ReactMarkdown from 'react-markdown';
import CodeBlock from '../components/Codeblock';

// let frameworkListDEfault : Array<string> = [
//   'laravel',
//   'symfony',
// ];

const Index = () => {

  const [frameworkList] = useState<Array<string>>([]);
  const [source, setSource] = useState('');
  const [framework, setFramework] = useState('');

  useEffect(() => {}, []);

  let onFrameworkChange = (v) => {
    setFramework(v.target.value);
  }

  let search = async () => {
    const apiURL : string = '/api/hello?';

    let a  = new URLSearchParams({
      'usecase': 'render_json',
      'framework': framework,
    })

    let url = apiURL + a;
    let data = await fetch(url);
    let json = await data.json();
    if (data.status === 200) {
      let snippet : string = '```\n';
      json.forEach(element => {
        snippet += `${element}\n`;
      });
      snippet += '```';
      setSource(snippet);
    }
  }

  return (
    <div className="container mx-auto">
      <select>
        <option value="render_json">Render JSON Response</option>
      </select>

      <select onChange={onFrameworkChange}>
        <option value="laravel">Laravel</option>
        <option value="symfony">Symfony</option>
      </select>

      <button onClick={search}>Search</button>

      {/* markdown here */}
        <ReactMarkdown
          source={source}
          renderers={{ code: CodeBlock}}
        />
    </div>
  );
};

export default Index;
