import React, { useState, useRef, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import Card from "@/components/Card";
const MediasPage: React.FC = () => {
    const [input, setInput] = useState("");

    const [description, setDescription] = useState("");

    const image = useRef<File | null>(null);

    const [cards, setCards] = useState<{
        input: string;
        description: string;
        image: File | null;
    }[]>([]);

    const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInput(event.target.value);
    };

    const handleChangeDescription = (
        event: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        setDescription(event.target.value);
    };

    const handleDrop = (acceptedFiles: File[]) => {
        image.current = acceptedFiles[0];
    };
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (input || description || image.current) {
            setCards([...cards, { input, description, image: image.current }]);
        }
        setInput("");
        setDescription("");
        image.current = null;
    };
    useEffect(() => {
        if (cards.length === 0) {
            if (input || description || image.current) {
                setCards([{ input, description, image: image.current }]);
            }
        } else {
            setCards([
                { input, description, image: image.current },
                ...cards.slice(1),
            ]);
        }
    }, [input, description, image.current]);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop: handleDrop,
        accept: {
            "image/*": [".jpeg", ".jpg", ".png"],
        },
        multiple: false,
    });

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 ">
            <div className="flex flex-col lg:flex-row items-start justify-center w-full max-w-4xl">
                <div className="flex flex-col w-full items-center lg:w-1/2 p-4">
                    <form onSubmit={handleSubmit} className="flex flex-col w-full">
                        <div
                            {...getRootProps()}
                            className="border border-gray-300 rounded-lg p-2 mb-2 flex flex-col items-center justify-center"
                            style={{ height: "200px" }}
                        >
                            <input {...getInputProps()} />
                            <p className="text-gray-500">Drag and drop an image here</p>
                            <p className="text-gray-500">or</p>
                            <p className="text-blue-500 underline cursor-pointer">
                                click to select an image file
                            </p>
                        </div>
                        <input
                            type="text"
                            value={input}
                            onChange={handleChangeInput}
                            placeholder="Type something…"
                            className="border border-gray-300 rounded-lg p-2 mb-2"
                        />
                        <textarea
                            value={description}
                            onChange={handleChangeDescription}
                            placeholder="Write something…"
                            className="border border-gray-300 rounded-lg p-2 mb-2"
                            rows={4}
                        />
                        <button
                            type="submit"
                            className="bg-black hover:bg-gray-800 text-white font-bold rounded-lg p-2"
                        >
                            Add Card
                        </button>
                    </form>
                </div>
                <div className="flex flex-col items-center lg:w-1/2 p-4 overflow-y-hidden h-50">
                    <div className="flex flex-wrap justify-center w-full overflow-hidden">
                        {cards.map((card, index) => (
                            <Card
                                key={index}
                                input={card.input}
                                description={card.description}
                                image={card.image}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MediasPage;
