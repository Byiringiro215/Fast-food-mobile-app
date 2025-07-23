import { CreateUserPrams, GetMenuParams, SignInParams } from "@/type";
import { Account, Avatars, Client, Databases, ID, Query, Storage } from "react-native-appwrite";

export const appwriteConfig = {
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!,
    projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!,
    platform: "com.spm.supermenu",
    databaseId: '687ce41d0003a695661b',
    bucketId: '687f7a06001466cb7bf5',
    userCollectionId: '687ce4c0003a62661fcc',
    categoriesCollectionId: '687f7319003c7060df27',
    menuCollectionId: '687f74310029c49e4da4',
    customizationCollectionId: '687f75bf0033f874946f',
    menuCustomizationCollectionId: '687f78b900082ed50305'
}

export const client = new Client();

client
    .setEndpoint(appwriteConfig.endpoint)
    .setProject(appwriteConfig.projectId)
    .setPlatform(appwriteConfig.platform)


export const account = new Account(client)
export const databases = new Databases(client)
export const storage = new Storage(client)
const avatars = new Avatars(client)

export const createUser = async ({ email, password, name }: CreateUserPrams) => {
    try {
        // Log out if a session is active
        try {
            await account.deleteSession('current');
        } catch (logoutErr) {
            // Ignore if no session exists, this is expected if the user is not logged in
        }

        const newAccount = await account.create(ID.unique(), email, password);
        if (!newAccount) throw new Error("Account creation failed");

        await signIn({ email, password });

        const avatarUrl = avatars.getInitialsURL(name);

        const doc = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            {
                accountId: newAccount.$id,
                email,
                name,
                avatar: avatarUrl,
            }
        );

        return doc;
    } catch (e) {
        console.error("createUser error:", e);
        throw new Error(e as string);
    }
};

export const signIn = async ({ email, password }: SignInParams) => {
    try {
        const session = await account.createEmailPasswordSession(email, password)
    } catch (e) {
        throw new Error(e as string)
    }
}


export const getCurrentUser = async () => {
    try {
        const currentAccount = await account.get();
        if (!currentAccount) throw Error;

        const currentUser = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [Query.equal('accountId', currentAccount.$id)]
        )
        if (!currentUser) throw Error

        return currentUser.documents[0]
    } catch (e) {
        console.log(e)
        throw new Error(e as string)
    }
}

export const getMenu = async ({ category, query }: GetMenuParams) => {
    try {
        const queries: string[] = [];

        if (category) queries.push(Query.equal('categories', category))
        if (query) queries.push(Query.search('name', query))

        const menus = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.menuCollectionId,
            queries
        )
        return menus.documents;
    } catch (e) {
        throw new Error(e as string)
    }
}

export const getCategories=async()=>{
try {
    const categories =await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.categoriesCollectionId
    )
} catch (e) {
    throw new Error(e as string)
}
}