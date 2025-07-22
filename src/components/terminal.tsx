
"use client";

import React, { useState, useEffect, useRef } from "react";

const welcomeLines = [
    "¡Bienvenido a mi Portfolio Terminal!",
    "",
    "",
    "Soy Ramiro Sabetta",
    "Desarrollador de Software",
    "",
    "",
    "Escribe 'help' para ver la lista de comandos disponibles",
    "o 'about' para conocer más sobre mí.",
    "",
];

const WelcomeMessage = () => (
    <>
        {welcomeLines.map((line, index) => (
            <p key={`welcome-${index}`} className="whitespace-pre">{line}</p>
        ))}
    </>
);


const AboutContent = () => (
  <div className="mt-1">
    <p>¡Hola, soy Ramiro y tengo 22 años! Me impulsa la búsqueda constante de soluciones eficientes, escalables y con impacto real. Disfruto transformar ideas en sistemas funcionales, combinar lógica con creatividad y mantenerme siempre en evolución dentro del mundo IT.</p>
    <p className="mt-2">
        <a href="https://docs.google.com/document/d/1c4HUGdOLbAGaX12CGDCpk-DUQLBMAOHbd1Qzc18FuKo/edit?usp=sharing" target="_blank" rel="noopener noreferrer" className="underline text-primary">Ver CV</a>
    </p>
  </div>
);

const HelpContent = () => (
    <div className="mt-1">
        <p>Comandos disponibles:</p>
        <div className="grid grid-cols-[max-content_auto] gap-x-4 gap-y-1 mt-1">
            <span className="text-primary">about</span><span>→ Sobre mí</span>
            <span className="text-primary">skills</span><span>→ Habilidades</span>
            <span className="text-primary">projects</span><span>→ Proyectos</span>
            <span className="text-primary">contact</span><span>→ Contacto</span>
            <span className="text-primary">clear</span><span>→ Limpiar</span>
            <span className="text-primary">help</span><span>→ Ayuda</span>
        </div>
    </div>
);

const ProjectsContent = () => <p className="mt-1">Mis proyectos se listarán here pronto. ¡Vuelve a consultar!</p>;
const ContactContent = () => (
    <div className="mt-1">
        <p>Email -&gt; <a href="mailto:sabettaramiro@gmail.com" className="underline">sabettaramiro@gmail.com</a></p>
        <p>GitHub -&gt; <a href="https://github.com/RamiroSabetta" target="_blank" rel="noopener noreferrer" className="underline">https://github.com/RamiroSabetta</a></p>
        <p>LinkedIn -&gt; <a href="https://www.linkedin.com/in/ramiro-sabetta-336337324/" target="_blank" rel="noopener noreferrer" className="underline">https://www.linkedin.com/in/ramiro-sabetta-336337324/</a></p>
    </div>
);
const SkillsContent = () => (
    <div className="mt-1">
        <div>
            <p className="font-bold text-primary">Frontend:</p>
            <p>HTML5, CSS3, JavaScript (ES6+)</p>
            <p>Bootstrap, Bulma</p>
            <p>TypeScript</p>
            <p>React.js</p>
            <p>Python, NiceGUI</p>
        </div>
        <div className="mt-2">
            <p className="font-bold text-primary">Backend:</p>
            <p>Node.js</p>
            <p>Python</p>
            <p>Java</p>
            <p>PHP</p>
            <p>MySQL</p>
            <p>MongoDB</p>
        </div>
        <div className="mt-2">
            <p className="font-bold text-primary">Herramientas & Otros:</p>
            <p>Git, GitHub</p>
            <p>VS Code, Eclipse IDE</p>
            <p>Postman</p>
            <p>Vite</p>
            <p>WordPress</p>
            <p>Azure DevOps</p>
            <p>Filezilla</p>
            <p>Windows, GNU/Linux</p>
        </div>
    </div>
);


export function Terminal() {
  const [history, setHistory] = useState<React.ReactNode[]>([]);
  const [input, setInput] = useState("");
  const [isWelcomeDone, setIsWelcomeDone] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const endOfHistoryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    let initialLines: React.ReactNode[] = [];
    const addLine = (index: number) => {
        if(index < welcomeLines.length) {
            initialLines = [...initialLines, <p key={`welcome-${index}`} className="whitespace-pre">{welcomeLines[index]}</p>];
            setHistory(initialLines);
            setTimeout(() => addLine(index + 1), 75);
        } else {
            setTimeout(() => setIsWelcomeDone(true), 100);
        }
    }
    addLine(0);
  }, []);

  useEffect(() => {
    endOfHistoryRef.current?.scrollIntoView({ behavior: "auto" });
  }, [history, isWelcomeDone]);
  
  const handleCommand = (command: string) => {
    let output: React.ReactNode;
    const commandToProcess = command.toLowerCase().trim();

    const commandLine = (
      <div key={`cmd-${history.length}`} className="mt-4">
        <span className="text-primary">visitor@portfolio:~$</span>
        <span className="ml-2">{command}</span>
      </div>
    );
    
    if (commandToProcess === 'clear') {
        setHistory([<WelcomeMessage key="welcome-reset" />]);
        return;
    }
    
    switch (commandToProcess) {
      case 'help':
        output = <HelpContent />;
        break;
      case 'about':
        output = <AboutContent />;
        break;
      case 'projects':
        output = <ProjectsContent />;
        break;
      case 'contact':
        output = <ContactContent />;
        break;
      case 'skills':
        output = <SkillsContent />;
        break;
      default:
        output = `bash: command not found: ${command}`;
        break;
    }
    
    const outputLine = <div key={`out-${history.length}`}>{output}</div>;
    setHistory(prev => [...prev, commandLine, outputLine]);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() === "") return;
    handleCommand(input);
    setInput("");
  };

  return (
    <div
      className="p-4 h-screen overflow-y-auto"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="flex flex-col">
        {history}
      </div>
      
      {isWelcomeDone && (
        <form onSubmit={handleSubmit} className="flex items-center mt-4">
          <label htmlFor="terminal-input" className="text-primary">visitor@portfolio:~$</label>
          <input
            id="terminal-input"
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-grow bg-transparent border-none outline-none ml-2 text-foreground caret-primary"
            autoComplete="off"
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck="false"
            autoFocus
          />
        </form>
      )}

      <div ref={endOfHistoryRef} />
    </div>
  );
}
