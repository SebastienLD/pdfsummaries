export function SiteFooter() {
  return (
    <footer>
      <div className="mb-10 flex flex-col items-center justify-between gap-4 border-t border-t-slate-200 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <p className="text-center text-sm leading-loose md:text-left">
            Built by{" "}
            <a
              href={"https://github.com/SebastienLD"}
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              Sebastien LD
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
