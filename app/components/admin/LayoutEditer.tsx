interface LayoutEditerProps {
  children: React.ReactNode;
  w: string; // Note: This should correspond to Tailwind's width utility classes.
}

export const LayoutEditer = (props: LayoutEditerProps) => {
  const { children, w } = props;

  return (
      <div className={`h-[800px] ${w}`}>
          <div
              className="bg-white relative z-20 rounded-2xl h-[calc(100%-60px)] overflow-hidden"
              style={{
                  scrollbarWidth: "thin", // Firefox
                  scrollBehavior: "smooth"
              }}
          >
              <style jsx>{`
                  /* Webkit */
                  ::-webkit-scrollbar {
                      width: 1px;
                  }
                  ::-webkit-scrollbar-track {
                      background: #f1f1f1;
                  }
                  ::-webkit-scrollbar-thumb {
                      background: #888;
                      border-radius: 4px;
                  }
                  ::-webkit-scrollbar-thumb:hover {
                      background: #555;
                  }
              `}</style>
              {children}
          </div>
      </div>
  );
};

export default LayoutEditer;
