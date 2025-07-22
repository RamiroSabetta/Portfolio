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
];

const AboutContent = () => (
  <div className="mt-1">
    <p>Soy Ramiro Sabetta, un apasionado desarrollador de software con experiencia en la creación de aplicaciones web robustas y escalables.</p>
    <p>Me especializo en tecnologías modernas como React, Next.js, Node.js y TypeScript.</p>
    <p>Mi objetivo es transformar ideas complejas en soluciones de software elegantes y eficientes.</p>
  </div>
);

const HelpContent = () => (
  <div className="mt-1 grid grid-cols-[max-content_1fr] gap-x-4 gap-y-1">
    <span className="text-primary">help</span><span>Muestra esta lista de comandos.</span>
    <span className="text-primary">about</span><span>Muestra información sobre mí.</span>
    <span className="text-primary">projects</span><span>Muestra mis proyectos. (Próximamente)</span>
    <span className="text-primary">contact</span><span>Muestra información de contacto.</span>
    <span className="text-primary">clear</span><span>Limpia la terminal.</span>
  </div>
);

const ProjectsContent = () => <p className="mt-1">Mis proyectos se listarán aquí pronto. ¡Vuelve a consultar!</p>;
const ContactContent = () => <p className="mt-1">Puedes contactarme en: <a href="mailto:ramiro.sabetta.dev@gmail.com" className="underline">ramiro.sabetta.dev@gmail.com</a></p>;


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
    const addLine = (index: number) => {
        if(index < welcomeLines.length) {
            setHistory(prev => [...prev, <p key={`welcome-${index}`} className="whitespace-pre">{welcomeLines[index]}</p>]);
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
        setHistory([]);
        return;
    }

    const commandLine = (
      <div key={`cmd-${history.length}`}>
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
        <form onSubmit={handleSubmit} className="flex items-center">
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
