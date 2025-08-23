const mockPrisma={
    job:{
        create:jest.fn(),
        findMany:jest.fn(), 
    },
};

jest.mock('@/lib/prisma',()=>({prisma:mockPrisma}));

import {getToken} from 'next-auth/jwt';

jest.mock('next-auth/jwt',()=>({getToken:jest.fn()}));

jest.mock('next/server',()=>({
    NextResponse:{
        json:jest.fn((data,init)=>({
            status:init?.status??200,
            json:async()=>data,
        }))
    }
}));

let POST,GET;

beforeAll(()=>{
    const routeModule=require('../../app/api/jobs/route');
    POST=routeModule.POST;
    GET=routeModule.GET;
});

beforeEach(()=>{
    jest.clearAllMocks();
});

const mockRequest=(body={},token=null)=>({
    json:()=>Promise.resolve(body),
    headers:new Headers(),
    _token:token,
});

describe ('/api/jobs API',()=>{
    it('returns 403 if role is not OWNER',async()=>{
        const req=mockRequest(
           {title}
        );
    })
})