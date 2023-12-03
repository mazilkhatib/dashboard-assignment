import React, {useMemo} from "react";

const Card: React.FC<{ input: string; description: string; image: File | null }> = ({ input, description, image, }) => {

    const imageUrl = useMemo(() => {
        if (image) {
            const url = URL.createObjectURL(image);
            return url;
        }
        return "";
    }, [image]);

    return (
        (input || description || image) &&
        <div className="relative flex bg-clip-border rounded-xl bg-white text-gray-700 shadow-md w-full flex-row mb-6">
            <div className="relative w-2/5 m-4 overflow-hidden text-gray-700 bg-white bg-clip-border rounded-xl shrink-0">
                <img src={imageUrl} alt="Uploaded image" className="object-cover w-full h-full" />
            </div>
            <div className="p-6">
                <h1 className="block mb-4 font-sans text-base font-semibold  tracking-normal text-gray-700 uppercase">
                    {input}
                </h1>
                <p className="block mb-8 font-sans text-base antialiased font-normal leading-relaxed text-gray-700">
                    {description}
                </p>
            </div>
        </div>
    );
};

export default Card;
