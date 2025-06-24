"use server";
import { client } from "@/lib/prisma";

// Mock user for development without Clerk
const MOCK_USER = {
  id: "mock-user-1",
  clerkId: "mock-clerk-id",
  email: "demo@example.com",
  name: "Demo User",
  profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
  subscription: true,
  createdAt: new Date(),
  updatedAt: new Date(),
  lemonSqueezyApiKey: null,
  storeId: null,
  webhookSecret: null,
  PurchasedProjects: []
};

export const onAuthenticateUser = async () => {
  try {
    // For development, always return the mock user
    return { status: 200, user: MOCK_USER };
    
    // Original Clerk code commented out
    /*
    const user = await currentUser();
    if (!user) {
      return { status: 403 };
    }

    const userExist = await client.user.findUnique({
      where: {
        clerkId: user.id,
      },
      include:{
        PurchasedProjects: {
          select:{
            id: true
          }
        }
      }
    });
    if (userExist) {
      return { status: 200, user: userExist };
    }

    const newUser = await client.user.create({
      data: {
        clerkId: user.id,
        email: user.emailAddresses[0].emailAddress,
        name: user.firstName + " " + user.lastName,
        profileImage: user.imageUrl,
      },
    });
    if (newUser) {
      return { status: 201, user: newUser };
    }
    return { status: 400 };
    */
  } catch (error) {
    console.log("🔴 ERROR", error);
    return { status: 500 };
  }
};

//Add lemonsqueezy api key to user
export const addLemonSqueezyApiKey = async (apiKey: string, storeId:string, webhookSecret:string) => {
  try {
    // Mock implementation for development
    return { status: 200, user: { ...MOCK_USER, lemonSqueezyApiKey: apiKey, storeId, webhookSecret } };
    
    // Original implementation commented out
    /*
    const user = await currentUser();
    if (!user) {
      return { status: 403 };
    }

    const updateUser = await client.user.update({
      where: {
        clerkId: user.id,
      },
      data: {
        lemonSqueezyApiKey: apiKey,
        storeId: storeId,
        webhookSecret: webhookSecret
      },
    });
    if (!updateUser) {
      return { status: 400, error: "Unable to update user" };
    }

    return { status: 200 , user: updateUser};
    */
  } catch (error) {
    console.log("🔴 ERROR", error);
    return { status: 500 };
  }
};

export const updateStoreId = async (storeId: string) => {
  try {
    // Mock implementation for development
    return { status: 200, user: { ...MOCK_USER, storeId } };
  } catch (error) {
    console.log("🔴 ERROR", error);
    return { status: 500 };
  }
}

export const updateLemonSqueezyApiKey = async (apiKey: string) => {
  try {
    // Mock implementation for development
    return { status: 200, user: { ...MOCK_USER, lemonSqueezyApiKey: apiKey } };
  } catch (error) {
    console.log("🔴 ERROR", error);
    return { status: 500 };
  }
}

export const updateWebhookSecret = async (webhookSecret: string) => {
  try {
    // Mock implementation for development
    return { status: 200, user: { ...MOCK_USER, webhookSecret } };
  } catch (error) {
    console.log("🔴 ERROR", error);
    return { status: 500 };
  }
}

//get User 
export const getUser = async (userId:string) => {
  try {
    // Mock implementation for development
    return { status: 200, user: MOCK_USER };
    
    // Original implementation commented out
    /*
    const userExist = await client.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (userExist) {
      return { status: 200, user: userExist };
    }
    return { status: 400 };
    */
  } catch (error) {
    console.log("🔴 ERROR", error);
    return { status: 500 };
  }
}