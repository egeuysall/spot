"use client";

import React, { useState, useMemo, useEffect } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  dracula,
  oneLight,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import { LucideCode, LucideCheck, LucideCopy, LucideFile } from "lucide-react";
import { cn } from "../../utils/functions";
import { iconSize } from "@/utils/design";
import { dmMono } from "@/lib/fonts";

const textStyle: string = "text-primary-500";

const languageIconMap: Record<string, React.ReactNode> = {
  html: <LucideCode className={textStyle} size={iconSize - 4} />,
  css: <LucideCode className={textStyle} size={iconSize - 4} />,
  js: <LucideCode className={textStyle} size={iconSize - 4} />,
  jsx: <LucideCode className={textStyle} size={iconSize - 4} />,
  javascript: <LucideCode className={textStyle} size={iconSize - 4} />,
  ts: <LucideCode className={textStyle} size={iconSize - 4} />,
  tsx: <LucideCode className={textStyle} size={iconSize - 4} />,
  typescript: <LucideCode className={textStyle} size={iconSize - 4} />,
  py: <LucideCode className={textStyle} size={iconSize - 4} />,
  python: <LucideCode className={textStyle} size={iconSize - 4} />,
  java: <LucideCode className={textStyle} size={iconSize - 4} />,
  txt: <LucideFile className={textStyle} size={iconSize - 4} />,
  text: <LucideFile className={textStyle} size={iconSize - 4} />,
  plaintext: <LucideFile className={textStyle} size={iconSize - 4} />,
  md: <LucideFile className={textStyle} size={iconSize - 4} />,
  markdown: <LucideFile className={textStyle} size={iconSize - 4} />,
  sh: <LucideFile className={textStyle} size={iconSize - 4} />,
  bash: <LucideFile className={textStyle} size={iconSize - 4} />,
  shell: <LucideFile className={textStyle} size={iconSize - 4} />,
};

type CodeBlockProps = {
  code: string;
  language?: string;
  fileName?: string | null;
  className?: string;
  codeClassName?: string;
};

const CodeBlock: React.FC<CodeBlockProps> = ({
  code = "print('Hello world!')",
  language = "py",
  fileName = "hello",
  className,
  codeClassName,
}) => {
  const [copied, setCopied] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Check if dark mode is enabled
    setIsDarkMode(
      window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches,
    );

    // Listen for changes in color scheme
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const listener = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);
    mediaQuery.addEventListener("change", listener);

    return () => mediaQuery.removeEventListener("change", listener);
  }, []);

  const handleCopy = async () => {
    if (!isClient) return;

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(code);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = code;
        textArea.style.top = "0";
        textArea.style.left = "0";
        textArea.style.position = "fixed";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch (error) {
      console.error("Failed to copy code:", error);
    }
  };

  // Memo for performance and to handle both abbreviation and full name
  const langIcon = useMemo(() => {
    const lang = language?.toLowerCase();
    if (lang && languageIconMap[lang]) return languageIconMap[lang];
    // try to match by extension if not found directly
    const ext = lang?.split(/[^a-z]/gi)[0];
    if (ext && languageIconMap[ext]) return languageIconMap[ext];
    return <LucideCode className="" size={iconSize - 4} />;
  }, [language]);

  // Use isDarkMode state to determine the theme instead of the prop
  const prismTheme = isDarkMode ? dracula : oneLight;
  const codeLines = code.split("\n");
  const lineNumbers = Array.from({ length: codeLines.length }, (_, i) => i + 1);

  return (
    <figure
      className={cn(
        "relative w-full font-dm-mono",
        dmMono.className,
        className,
      )}
    >
      <div className={cn("rounded-xl overflow-hidden w-full bg-primary-200")}>
        {fileName && (
          <figcaption
            className={cn(
              "flex items-center justify-between px-4 py-2.5 border-b border-primary-300",
            )}
          >
            <div className="flex items-center gap-2">
              <div className="flex-shrink-0">{langIcon}</div>
              <span className="text-base font-bold ">
                {`${fileName}${language ? `.${language}` : ""}`}
              </span>
            </div>
            <button
              onClick={handleCopy}
              aria-label={copied ? "Copied!" : "Copy code"}
              className={cn(
                "flex items-center transition-all duration-200 hover:opacity-80  ml-6",
              )}
              title={copied ? "Copied!" : "Copy code"}
              type="button"
              disabled={!isClient}
            >
              {copied ? (
                <LucideCheck className="w-4 h-4" />
              ) : (
                <LucideCopy className="w-4 h-4" />
              )}
            </button>
          </figcaption>
        )}
        <div className={cn("relative group")}>
          <div className="max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-neutral-300 scrollbar-track-transparent">
            <div
              className={cn(
                "grid grid-cols-[auto_1fr] w-full",
                codeClassName,
                dmMono.className,
              )}
            >
              <div
                className={cn(
                  "flex flex-col items-end pt-5 pb-5 px-3 bg-transparent select-none text-neutral-400",
                )}
              >
                {lineNumbers.map((num) => (
                  <div
                    key={num}
                    className="leading-[1.5] text-md min-h-[1.5em] text-primary-300"
                  >
                    {num}
                  </div>
                ))}
              </div>
              <div className="relative flex-1 min-w-0 pt-5 pb-5 pl-0 pr-4">
                {isClient && (
                  <SyntaxHighlighter
                    language={language}
                    style={prismTheme}
                    customStyle={{
                      margin: 0,
                      padding: 0,
                      background: "transparent",
                      fontSize: "inherit",
                      fontFamily: "inherit",
                    }}
                    codeTagProps={{
                      style: {
                        fontFamily: dmMono.className,
                      },
                    }}
                    showLineNumbers={false}
                    wrapLongLines={true}
                    lineProps={() => ({
                      style: {
                        whiteSpace: "pre-wrap",
                        minHeight: "1.5em",
                        marginBottom: 0,
                      },
                    })}
                  >
                    {code}
                  </SyntaxHighlighter>
                )}
              </div>
            </div>
          </div>
          {!fileName && isClient && (
            <button
              onClick={handleCopy}
              aria-label={copied ? "Copied!" : "Copy code"}
              className={cn(
                "absolute right-2 top-2 transition-all duration-200 hover:opacity-80",
              )}
              title={copied ? "Copied!" : "Copy code"}
              type="button"
              disabled={!isClient}
            >
              {copied ? (
                <LucideCheck className="w-5 h-5" />
              ) : (
                <LucideCopy className="w-4 h-4" />
              )}
            </button>
          )}
        </div>
      </div>
    </figure>
  );
};

export default CodeBlock;
