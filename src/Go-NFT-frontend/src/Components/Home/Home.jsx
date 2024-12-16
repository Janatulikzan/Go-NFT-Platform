import React, { useState } from "react";
import { Actor, HttpAgent } from "@dfinity/agent";
import { idlFactory } from "../../../declarations/Go-NFT-backend"; // Ganti dengan path yang sesuai
import Navbar from '../Navbar/Navbar';
import './Home.css';

const Home = () => {
    const [file, setFile] = useState(null); // Menyimpan file yang diunggah
    const [nftName, setNftName] = useState(''); // Nama NFT
    const [nftDescription, setNftDescription] = useState(''); // Deskripsi NFT
    const [collection, setCollection] = useState([]); // Koleksi NFT yang dibuat

    // Fungsi untuk menangani pengunggahan gambar
    const handleChange = (e) => {
        setFile(URL.createObjectURL(e.target.files[0]));
    };

    // Fungsi untuk membuat NFT
    const handleCreateNFT = async (e) => {
        e.preventDefault();

        if (nftName && nftDescription && file) {
            try {
                // Inisialisasi agen dan aktor
                const agent = new HttpAgent();
                const actor = Actor.createActor(idlFactory, {
                    agent,
                    canisterId: "your_canister_id_here", // Ganti dengan Canister ID Anda
                });

                // Konversi file menjadi array buffer
                const imageBuffer = await fetch(file).then(res => res.arrayBuffer());
                const imageBytes = Array.from(new Uint8Array(imageBuffer));

                // Mint NFT dengan actor
                const result = await actor.mintNFT(
                    window.ic.plug.sessionManager.getSession().principal, // Principal pengguna
                    nftName,
                    nftDescription.split(","), // Split deskripsi jika multi-line
                    imageBytes // Data gambar
                );

                alert(`NFT berhasil dibuat! ID NFT: ${result}`);

                // Tambahkan NFT ke koleksi lokal
                setCollection([
                    ...collection,
                    {
                        name: nftName,
                        description: nftDescription,
                        image: file,
                    }
                ]);

                // Reset form
                setNftName('');
                setNftDescription('');
                setFile(null);
            } catch (error) {
                console.error("Error saat membuat NFT:", error);
                alert("Gagal membuat NFT. Silakan coba lagi.");
            }
        } else {
            alert("Pastikan semua field telah diisi dan gambar diunggah!");
        }
    };

    return (
        <div className="home">
            <Navbar />
            <div className="wrapper">
                <div className="home-container">
                    <form onSubmit={handleCreateNFT}>
                        <h2 className="form-title">Go NFT</h2>

                        {/* Input Nama */}
                        <div className="input-box name-input">
                            <input
                                type="text"
                                placeholder="NFT Name"
                                value={nftName}
                                onChange={(e) => setNftName(e.target.value)}
                                required
                            />
                        </div>

                        {/* Input Deskripsi */}
                        <div className="input-box description-input">
                            <input
                                type="text"
                                placeholder="NFT Description"
                                value={nftDescription}
                                onChange={(e) => setNftDescription(e.target.value)}
                                required
                            />
                        </div>

                        {/* Upload Gambar */}
                        <div className="input-box image-upload">
                            <h2 className="upload-title">Add Image:</h2>
                            <input
                                type="file"
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* Tombol Submit */}
                        <button className="submit-button" type="submit">
                            Create NFT
                        </button>
                    </form>
                </div>

                {/* Bagian Koleksi */}
                <div className="collection-box">
                    <h2>Collection</h2>
                    <p>Your created NFTs will appear here.</p>
                    <ul className="collection-list">
                        {collection.map((nft, index) => (
                            <li key={index} className="collection-item">
                                {nft.image && (
                                    <img
                                        src={nft.image}
                                        alt={nft.name}
                                        className="collection-image"
                                    />
                                )}
                                <h3>{nft.name}</h3>
                                <p>{nft.description}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Home;
