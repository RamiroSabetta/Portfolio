
"use client";

import React, { useState, useEffect, useRef } from "react";

const welcomeLines = [
    "¡Bienvenido a mi Portfolio Terminal!",
    "",
    "Soy Ramiro Sabetta",
    "Desarrollador de Software",
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
    <p>¡Hola, soy Ramiro y tengo 22 años! Me impulsa la búsqueda constante de soluciones eficientes, escalables y con impacto real.</p>
    <p>Disfruto transformar ideas en sistemas funcionales, combinar lógica con creatividad y mantenerme siempre en evolución dentro del mundo IT.</p>
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

const ProjectsContent = () => <p className="mt-1">Mis proyectos se listarán aquí pronto. ¡Vuelve a consultar!</p>;
const ContactContent = () => <p className="mt-1">Puedes contactarme en: <a href="mailto:ramiro.sabetta.dev@gmail.com" className="underline">ramiro.sabetta.dev@gmail.com</a></p>;
const SkillsContent = () => (
    <div className="mt-1">
        <div>
            <p className="font-bold text-primary">Frontend:</p>
            <ul className="list-disc list-inside">
                <li>HTML5, CSS3, JavaScript (ES6+), TypeScript</li>
                <li>React.js</li>
                <li>Bootstrap, Bulma</li>
                <li>NiceGUI</li>
            </ul>
        </div>
        <div className="mt-2">
            <p className="font-bold text-primary">Backend:</p>
            <ul className="list-disc list-inside">
                <li>Python, Java, PHP</li>
                <li>Node.js</li>
                <li>MySQL, MongoDB</li>
                <li>Apache Server</li>
                <li>NiceGUI</li>
            </ul>
        </div>
        <div className="mt-2">
            <p className="font-bold text-primary">Herramientas & Otros:</p>
            <ul className="list-disc list-inside">
                <li>Git, GitHub</li>
                <li>Visual Studio Code, Eclipse IDE</li>
                <li>Postman</li>
                <li>Vite, WordPress</li>
                <li>Azure DevOps, Filezilla</li>
                <li>Windows, GNU/Linux</li>
            </ul>
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

    if (commandToProcess === 'clear') {
        setHistory([<WelcomeMessage key="welcome-reset" />]);
        return;
    }

    const commandLine = (
      <div key={`cmd-${history.length}`} className="mt-4">
        <span className="text-primary">visitor@portfolio:~$</span>
        <span className="ml-2">{command}</span>
      </div>
    );
    
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
