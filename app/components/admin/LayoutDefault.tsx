import { ReactNode } from "react";
import { Header } from "./Header";
import { Navbar } from "../Navbar";

export const LayoutDefault = ({ children }: { children: ReactNode }) => {
    return (
        <div
            className="min-h-screen min-w-[1920px] bg-cover bg-center py-10"
            style={{
                backgroundImage: 'url("/Background.svg")',
            }}
        >
            <Header />
            <div className="max-w-full py-20">
                <div className="grid grid-cols-12 gap-16">
                    <div className="col-span-2">
                        <Navbar />
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default LayoutDefault;
