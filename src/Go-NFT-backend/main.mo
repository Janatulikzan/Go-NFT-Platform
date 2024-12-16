import Debug "mo:base/Debug";
import Principal "mo:base/Principal";

actor {
    // Tipe data NFT
    public type NFT = {
        id: Nat;
        owner: Principal;
        name: Text;
        description: Text;
        attributes: [Text];
        image: Blob;
        imageUrl: Text;
    };

    // Variabel penyimpanan NFT
    stable var nfts: [NFT] = [];
    stable var nextId: Nat = 0;

    // Fungsi untuk mencetak NFT
    public func mintNFT(owner: Principal, name: Text, description: Text, attributes: [Text], image: Blob, imageUrl: Text): 
    Nat {
        let newNFT = {
            id = nextId;
            owner;
            name;
            description;
            attributes;
            image;
            imageUrl;
        };
        nfts := Array.append(nfts, [newNFT]);
        nextId += 1;
        return newNFT.id;
    };
    

    // Fungsi untuk mendapatkan NFT milik pengguna
    public query func getUserNFTs(owner: Principal): [NFT] {
        return nfts.filter(nft -> nft.owner == owner);
    };
}
