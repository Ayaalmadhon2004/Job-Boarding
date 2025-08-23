// src/tests/api/JobRoute.test.js
// ----------- Mock Prisma ----------- //
const mockPrisma = {
  job: {
    create: jest.fn(),
    findMany: jest.fn(),
  },
};
jest.mock('@/lib/prisma', () => ({ prisma: mockPrisma }));

import { getToken } from 'next-auth/jwt';


// ----------- Mock next-auth/jwt ----------- //
jest.mock('next-auth/jwt', () => ({ getToken: jest.fn() }));

// ----------- Mock NextResponse ----------- //
jest.mock('next/server', () => ({
  NextResponse: {
    json: jest.fn((data, init) => ({
      status: init?.status ?? 200,
      json: async () => data,
    })),
  },
}));

// ---------- Import route handlers after mocks ----------
// ---------- Import route handlers after mocks ----------
let POST, GET;

beforeAll(() => {
  const routeModule = require('../../app/api/jobs/route');
  POST = routeModule.POST;
  GET = routeModule.GET;
});

beforeEach(() => {
  jest.clearAllMocks();
});

// ---------- Helper to mock NextRequest ----------
const mockRequest = (body = {}, token = null) => ({
  json: () => Promise.resolve(body),
  headers: new Headers(),
  _token: token, // نستخدمها داخل getToken mock
});

// ---------- Apply getToken mock ----------
getToken.mockImplementation(({ req }) => Promise.resolve(req._token));

// ---------- Test Suite ----------
describe('/api/jobs API', () => {

/* it('creates a job when POST is called by OWNER', async () => {
    const req = mockRequest(
      { title: 'Test Job', description: 'Test Desc', type: 'Full-time' },
      { id: '123', role: 'OWNER' }
    );

    mockPrisma.job.create.mockResolvedValue({
      id: '1',
      title: 'Test Job',
      description: 'Test Desc',
      type: 'Full-time',
      ownerId: '123',
    });

    const response = await POST(req);

    expect(mockPrisma.job.create).toHaveBeenCalledWith({
      data: {
        title: 'Test Job',
        description: 'Test Desc',
        type: 'Full-time',
        ownerId: '123',
      },
    });
    expect(response.status).toBe(201);
    const data = await response.json();
    expect(data).toEqual({
      newJob: {
        id: '1',
        title: 'Test Job',
        description: 'Test Desc',
        type: 'Full-time',
        ownerId: '123',
      },
    });
  });*/

  it('returns 403 if role is not OWNER', async () => {
    const req = mockRequest(
      { title: 'Test Job', description: 'Test Desc', type: 'Full-time' },
      { id: '123', role: 'USER' }
    );

    const response = await POST(req);

    expect(response.status).toBe(403);
    const data = await response.json();
    expect(data).toEqual({ error: 'Forbidden' });
    expect(mockPrisma.job.create).not.toHaveBeenCalled();
  });

  it('returns 401 if no token', async () => {
    const req = mockRequest({ title: 'Test Job', description: 'Test Desc', type: 'Full-time' }, null);

    const response = await POST(req);

    expect(response.status).toBe(401);
    const data = await response.json();
    expect(data).toEqual({ error: 'Unauthorized' });
  });

  it('returns 400 if title, description, or type are missing', async () => {
    const req = mockRequest({ description: 'Test Desc', type: 'Full-time' }, { id: '123', role: 'OWNER' });

    const response = await POST(req);

    expect(response.status).toBe(400);
    const data = await response.json();
    expect(data).toEqual({ error: 'Title, description and type are required' });
  });

  it('returns 500 if job creation fails', async () => {
    const req = mockRequest(
      { title: 'Test Job', description: 'Test Desc', type: 'Full-time' },
      { id: '123', role: 'OWNER' }
    );

    mockPrisma.job.create.mockRejectedValue(new Error('Database error'));

    const response = await POST(req);

    expect(response.status).toBe(500);
    const data = await response.json();
    expect(data).toEqual({ error: 'Failed to create job' });
  });

/*  it('returns jobs when GET is called', async () => {
    const jobs = [
      { id: '1', title: 'Job 1', createdAt: new Date() },
      { id: '2', title: 'Job 2', createdAt: new Date() },
    ];
    mockPrisma.job.findMany.mockResolvedValue(jobs);

    const response = await GET();

    expect(mockPrisma.job.findMany).toHaveBeenCalledWith({ orderBy: { id: 'desc' } });
    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data).toEqual(jobs);
  });*/

/*  it('returns 500 if fetching jobs fails', async () => {
    // ضبط الـ mock ليُرجع خطأ عند استدعاء findMany
    mockPrisma.job.findMany.mockRejectedValue(new Error('Database error'));

    const response = await GET();

    // طباعة كل استدعاءات الموك لرؤية ما حدث
    console.log('findMany calls:', mockPrisma.job.findMany.mock.calls);

    // طباعة الاستجابة الكاملة من GET
    const data = await response.json();
    console.log('GET response:', { status: response.status, data });

    expect(response.status).toBe(500);
    expect(data).toEqual({ error: 'Failed to fetch jobs' });
  });*/
});
