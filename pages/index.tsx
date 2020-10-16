import { SyntheticEvent, useEffect, useState } from "react";
import ReactMarkdown from 'react-markdown';

let framework : Array<string> = [
  'laravel',
  'symfony',
];

const Index = () => {

  const [frameworkList] = useState<Array<string>>([]);
  const [source, setSource] = useState('');
  const [framework, setFramework] = useState('');

  useEffect(() => {
    console.log('s');
  }, []);


  let onFrameworkChange = (v) => {
    console.log(v.target.value);

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
        console.log(element)
        snippet += `${element}\n`;
      });
      snippet += '```';
      setSource(snippet);
    }
  }

  return (
    <div className="cotnainer">
      <select>
        <option value="render_json">Render JSON</option>
      </select>

      <select onChange={onFrameworkChange}>
        <option value="laravel">Laravel</option>
        <option value="symfony">Symfony</option>
      </select>

      <button onClick={search}>Search</button>

      {/* markdown here */}
      <ReactMarkdown
  source={source}
  escapeHtml={false}
/>
    </div>
  );
};

export default Index;
