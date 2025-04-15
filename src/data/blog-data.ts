
import { BlogPost } from "@/types";

export const blogPosts: BlogPost[] = [
  {
    slug: "building-my-first-saas",
    title: "Building My First SaaS: Lessons Learned",
    excerpt: "A retrospective on launching my first software-as-a-service product and the key takeaways from the experience.",
    content: `
# Building My First SaaS: Lessons Learned

When I started building my first SaaS product, I had no idea what I was getting myself into. The journey was filled with ups and downs, technical challenges, and valuable lessons that shaped my approach to indie hacking.

## The Idea Phase

It all started with a problem I faced repeatedly—tracking my coding time across different projects and clients. I wanted a simple, developer-friendly solution that integrated with my workflow rather than disrupting it.

After validating the idea by talking to fellow developers and finding many shared the same pain point, I decided to build TimeTrail—a minimalist time tracking tool for developers.

## Technical Stack Decisions

For the tech stack, I went with:

- React for the frontend
- Node.js/Express for the API
- PostgreSQL for the database
- Auth0 for authentication

Looking back, I would have made some different choices. The stack worked well, but I overengineered several features that users didn't even care about.

## Launch Day Surprises

After three months of development, I launched on Product Hunt and Hacker News. The response was better than expected, with over 500 sign-ups on the first day. However, I quickly realized I hadn't properly prepared for:

1. Support requests
2. Server scaling issues
3. Feature prioritization based on user feedback

## Key Lessons

### 1. Start with a Minimum Viable Product

I spent too much time adding "nice-to-have" features before launching. I should have released a simpler version sooner and iterated based on actual usage.

### 2. Talk to Users Early and Often

Some of my assumptions about what users wanted were completely wrong. The features I thought were crucial turned out to be less important than others I hadn't prioritized.

### 3. Don't Neglect Marketing

As a developer, I focused heavily on building the product but underestimated the importance of marketing. No matter how good your product is, people need to know about it.

### 4. Pricing Strategy Matters

I initially priced too low, thinking it would attract more users. This created the wrong perception of value and made it harder to increase prices later.

## Moving Forward

These lessons have been invaluable for my subsequent projects. The most important takeaway was learning to balance technical excellence with business needs—something that doesn't always come naturally to developers.

Have you built a SaaS product? I'd love to hear about your experience and the lessons you learned along the way.
    `,
    date: "2024-04-02",
    coverImage: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    readingTime: 7,
    tags: ["SaaS", "Entrepreneurship", "Web Development"],
    author: {
      name: "Jane Developer",
      bio: "Full-stack developer and indie hacker building useful tools for developers."
    }
  },
  {
    slug: "mastering-react-hooks",
    title: "Mastering React Hooks: Beyond the Basics",
    excerpt: "Take your React skills to the next level by mastering hooks with these advanced patterns and techniques.",
    content: `
# Mastering React Hooks: Beyond the Basics

React Hooks revolutionized how we write React components, enabling state and other React features without classes. While useState and useEffect are the gateway to hooks, there's so much more to explore. Let's dive into some advanced patterns.

## Custom Hooks: Organizing Logic

Custom hooks are the perfect way to extract and reuse stateful logic between components. Here's a useful hook for handling form state:

\`\`\`typescript
function useForm<T>(initialValues: T) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    });
    
    // Clear error when field is modified
    if (errors[name as keyof T]) {
      setErrors({
        ...errors,
        [name]: undefined
      });
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name } = e.target;
    setTouched({
      ...touched,
      [name]: true
    });
  };

  const reset = () => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  };

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    setValues,
    setErrors,
    reset
  };
}
\`\`\`

## useReducer for Complex State Logic

For complex state logic, useReducer provides a more structured approach:

\`\`\`typescript
type State = {
  count: number;
  step: number;
  isRunning: boolean;
};

type Action = 
  | { type: 'increment' }
  | { type: 'decrement' }
  | { type: 'setStep'; payload: number }
  | { type: 'reset' }
  | { type: 'toggleRunning' };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'increment':
      return { ...state, count: state.count + state.step };
    case 'decrement':
      return { ...state, count: state.count - state.step };
    case 'setStep':
      return { ...state, step: action.payload };
    case 'reset':
      return { count: 0, step: 1, isRunning: false };
    case 'toggleRunning':
      return { ...state, isRunning: !state.isRunning };
    default:
      return state;
  }
}

// In your component:
const [state, dispatch] = useReducer(reducer, { count: 0, step: 1, isRunning: false });
\`\`\`

## useCallback and useMemo for Performance

These hooks help prevent unnecessary renders by memoizing functions and values:

\`\`\`typescript
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);

const memoizedCallback = useCallback(() => {
  doSomethingWith(a, b);
}, [a, b]);
\`\`\`

## useRef Beyond DOM References

useRef is incredibly versatile beyond just DOM references:

\`\`\`typescript
// For storing previous values
function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>();
  
  useEffect(() => {
    ref.current = value;
  }, [value]);
  
  return ref.current;
}

// For interval timers
function useInterval(callback: () => void, delay: number | null) {
  const savedCallback = useRef(callback);
  
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);
  
  useEffect(() => {
    if (delay === null) return;
    
    const id = setInterval(() => savedCallback.current(), delay);
    return () => clearInterval(id);
  }, [delay]);
}
\`\`\`

## Context with Hooks for Global State

Creating and using context becomes much cleaner with hooks:

\`\`\`typescript
// Create the context
const ThemeContext = createContext({
  theme: 'light',
  toggleTheme: () => {}
});

// Provider component
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook for consuming the context
function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
\`\`\`

## Conclusion

Mastering React hooks doesn't happen overnight. It requires practice and experimentation to fully grasp their power. The patterns above will help you write more maintainable, reusable, and performant React code.

What's your favorite hook pattern? Share your thoughts and experiences in the comments!
    `,
    date: "2024-03-27",
    coverImage: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    readingTime: 10,
    tags: ["React", "JavaScript", "Web Development"],
    author: {
      name: "Jane Developer",
      bio: "Full-stack developer and indie hacker building useful tools for developers."
    }
  },
  {
    slug: "bulletproof-typescript-patterns",
    title: "Bulletproof TypeScript Patterns for Production Apps",
    excerpt: "Production-ready TypeScript patterns that will help you write more maintainable and robust applications.",
    content: `
# Bulletproof TypeScript Patterns for Production Apps

TypeScript has become the standard choice for large-scale JavaScript applications, but using it effectively requires more than just adding type annotations. In this post, I'll share battle-tested patterns I use in production applications to maximize type safety while maintaining code flexibility.

## Discriminated Unions for State Management

When managing state, especially with reducers, discriminated unions provide compile-time guarantees about which actions can be performed in which states:

\`\`\`typescript
type RequestState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: Error };

// Usage
function UserProfile() {
  const [userState, setUserState] = useState<RequestState<User>>({ status: 'idle' });

  useEffect(() => {
    const fetchUser = async () => {
      setUserState({ status: 'loading' });
      try {
        const user = await api.getUser();
        setUserState({ status: 'success', data: user });
      } catch (error) {
        setUserState({ 
          status: 'error', 
          error: error instanceof Error ? error : new Error(String(error))
        });
      }
    };
    
    fetchUser();
  }, []);

  // Type-safe rendering based on state
  if (userState.status === 'loading') {
    return <Spinner />;
  }
  
  if (userState.status === 'error') {
    return <ErrorMessage message={userState.error.message} />;
  }
  
  if (userState.status === 'success') {
    // TypeScript knows userState.data is available here
    return <UserDetails user={userState.data} />;
  }

  return <button onClick={() => setUserState({ status: 'loading' })}>Load User</button>;
}
\`\`\`

## The Builder Pattern for Complex Objects

When creating objects with many optional properties, the builder pattern provides a fluent interface with type safety:

\`\`\`typescript
class QueryBuilder<T> {
  private query: Partial<T> = {};

  where<K extends keyof T>(key: K, value: T[K]): this {
    this.query[key] = value;
    return this;
  }

  whereIn<K extends keyof T>(key: K, values: Array<T[K]>): this {
    // Implementation
    return this;
  }

  orderBy<K extends keyof T>(key: K, direction: 'asc' | 'desc' = 'asc'): this {
    // Implementation
    return this;
  }

  limit(limit: number): this {
    // Implementation
    return this;
  }

  build(): Partial<T> {
    return {...this.query};
  }
}

// Usage
const usersQuery = new QueryBuilder<User>()
  .where('status', 'active')
  .whereIn('role', ['admin', 'editor'])
  .orderBy('createdAt', 'desc')
  .limit(10)
  .build();
\`\`\`

## Type Guards for Runtime Validation

Type guards bridge the gap between compile-time and runtime type checking:

\`\`\`typescript
interface User {
  id: string;
  name: string;
  email: string;
}

// Type guard function
function isUser(obj: unknown): obj is User {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'id' in obj &&
    'name' in obj &&
    'email' in obj &&
    typeof (obj as User).id === 'string' &&
    typeof (obj as User).name === 'string' &&
    typeof (obj as User).email === 'string'
  );
}

// Usage with API responses
async function getUser(id: string): Promise<User> {
  const response = await fetch(`/api/users/${id}`);
  const data = await response.json();
  
  if (isUser(data)) {
    return data; // TypeScript knows data is User
  }
  
  throw new Error('Invalid user data received from API');
}
\`\`\`

## Branded Types for Type Safety

Sometimes you need to differentiate between types with the same structure but different semantics:

\`\`\`typescript
// Define branded types
type UserId = string & { readonly __brand: unique symbol };
type OrderId = string & { readonly __brand: unique symbol };

// Create factory functions
function createUserId(id: string): UserId {
  return id as UserId;
}

function createOrderId(id: string): OrderId {
  return id as OrderId;
}

// Now these functions will only accept the correct type
function fetchUser(id: UserId) {
  // Implementation
}

function fetchOrder(id: OrderId) {
  // Implementation
}

// Usage
const userId = createUserId('user-123');
const orderId = createOrderId('order-456');

fetchUser(userId); // ✓ OK
fetchOrder(orderId); // ✓ OK
fetchUser(orderId); // ✗ Type error: Argument of type 'OrderId' is not assignable to parameter of type 'UserId'
\`\`\`

## Advanced Type Utilities

TypeScript's type system is Turing-complete, allowing for powerful type transformations:

\`\`\`typescript
// Make all properties optional and nullable
type Nullable<T> = { [P in keyof T]: T[P] | null };

// Extract the type of a Promise's resolved value
type Awaited<T> = T extends Promise<infer R> ? R : T;

// Make specific properties required
type RequireKeys<T, K extends keyof T> = T & { [P in K]-?: T[P] };

// Create a type with only the specified keys
type Pick<T, K extends keyof T> = { [P in K]: T[P] };

// Remove readonly modifier from properties
type Mutable<T> = { -readonly [P in keyof T]: T[P] };
\`\`\`

## Dependency Injection with Interfaces

For testable, maintainable code, use interfaces for services and inject dependencies:

\`\`\`typescript
interface Logger {
  debug(message: string): void;
  info(message: string): void;
  warn(message: string): void;
  error(message: string, error?: Error): void;
}

interface UserService {
  getUser(id: string): Promise<User>;
  updateUser(user: User): Promise<User>;
}

class UserController {
  constructor(
    private userService: UserService,
    private logger: Logger
  ) {}
  
  async handleGetUser(id: string): Promise<User> {
    this.logger.info(`Fetching user: ${id}`);
    try {
      const user = await this.userService.getUser(id);
      return user;
    } catch (error) {
      this.logger.error('Failed to get user', error as Error);
      throw error;
    }
  }
}

// Easy to test with mocks
const mockLogger: Logger = {
  debug: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn()
};

const mockUserService: UserService = {
  getUser: jest.fn(),
  updateUser: jest.fn()
};

const controller = new UserController(mockUserService, mockLogger);
\`\`\`

## Conclusion

TypeScript's power goes far beyond simple type annotations. By leveraging these patterns, you can build applications that are not only type-safe but also more maintainable, testable, and robust in production.

What are your favorite TypeScript patterns? Share in the comments!
    `,
    date: "2024-03-15",
    coverImage: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
    readingTime: 12,
    tags: ["TypeScript", "JavaScript", "Software Architecture"],
    author: {
      name: "Jane Developer",
      bio: "Full-stack developer and indie hacker building useful tools for developers."
    }
  },
  {
    slug: "indie-hacker-tools",
    title: "Essential Tools for the Modern Indie Hacker",
    excerpt: "A curated list of tools and resources that will help you build, launch, and grow your indie projects more efficiently.",
    content: `
# Essential Tools for the Modern Indie Hacker

As an indie hacker building products solo or with a small team, choosing the right tools can make all the difference in your productivity and time-to-market. Here's my curated list of essential tools that have helped me launch multiple projects without breaking the bank.

## Development

### 1. **Vercel/Netlify**

Deploy web applications with zero configuration. Both platforms offer generous free tiers, automatic deployments from Git, and preview URLs for pull requests.

### 2. **Firebase/Supabase**

When you need a backend but don't want to build one from scratch, these platforms provide authentication, databases, storage, and more with simple client SDKs.

### 3. **Next.js/SvelteKit**

Modern frameworks that handle routing, SSR, and optimization out of the box. They strike a good balance between developer experience and performance.

### 4. **TailwindCSS**

Build beautiful interfaces without leaving your HTML. The utility-first approach accelerates development significantly once you get past the initial learning curve.

## Design

### 1. **Figma**

The gold standard for UI design with a generous free tier. Create mockups, prototypes, and design systems all in one tool.

### 2. **Unsplash/Pexels**

Free, high-quality stock photos that don't look like stock photos.

### 3. **Midjourney/DALL-E**

Generate unique illustrations and graphics for your project with AI.

## Marketing & Analytics

### 1. **Plausible/Simple Analytics**

Privacy-friendly analytics that give you the insights you need without the bloat of Google Analytics.

### 2. **Mailchimp/ConvertKit**

Email remains one of the most effective marketing channels. Both offer free tiers for building your initial email list.

### 3. **Buffer/Hypefury**

Schedule social media posts across multiple platforms in batches to maintain consistent presence without the daily distraction.

## Payments & Monetization

### 1. **Stripe/Paddle**

Accept payments with minimal hassle. Paddle handles VAT/sales tax automatically, which is a huge benefit for international sales.

### 2. **Gumroad/Lemon Squeezy**

Simpler alternatives for digital products with built-in checkout pages, affiliate programs, and email marketing.

## Productivity & Project Management

### 1. **Notion/Obsidian**

Organize your thoughts, documentation, and plans. I prefer Obsidian for personal knowledge management and Notion for team collaboration.

### 2. **Linear/Height**

Beautiful, keyboard-focused issue tracking without the complexity of Jira.

### 3. **Clockify/Toggl**

Time tracking helps you understand where your hours go and how to price your services.

## Customer Support

### 1. **Intercom/Crisp**

Chat widgets that let you talk directly to your users. Crisp has a generous free tier that's perfect for early-stage products.

### 2. **Help Scout/Groove**

When you're ready for a more robust help desk solution, these tools provide a great experience for both customers and support agents.

## Infrastructure & DevOps

### 1. **GitHub Actions/CircleCI**

Automate your testing and deployment pipeline. GitHub Actions are particularly convenient if you're already using GitHub.

### 2. **Cloudflare**

Free CDN, DDoS protection, and edge functions to make your application faster and more secure.

### 3. **Updown.io/Better Uptime**

Monitor your application's uptime and get alerted when things go wrong.

## Learning Resources

### 1. **Indie Hackers**

Community, podcasts, and interviews with successful indie founders.

### 2. **ProductHunt**

Launch your products and discover what others are building.

### 3. **No CS Degree**

Interviews and resources specifically for self-taught developers.

## Conclusion

The modern indie hacker has access to an unprecedented array of tools that make it possible to compete with much larger teams. The key is choosing tools that accelerate your workflow without introducing unnecessary complexity.

What tools have you found indispensable in your indie hacking journey? Share your recommendations in the comments!
    `,
    date: "2024-02-28",
    coverImage: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
    readingTime: 8,
    tags: ["Tools", "Productivity", "Indie Hacking"],
    author: {
      name: "Jane Developer",
      bio: "Full-stack developer and indie hacker building useful tools for developers."
    }
  },
  {
    slug: "scaling-serverless-apis",
    title: "Scaling Serverless APIs: Lessons from 10M Monthly Requests",
    excerpt: "Practical techniques and patterns for building serverless APIs that scale gracefully to handle millions of requests.",
    content: `
# Scaling Serverless APIs: Lessons from 10M Monthly Requests

When I first built a serverless API using AWS Lambda and API Gateway, I was amazed by how quickly I could deploy a working endpoint. But as my user base grew from hundreds to thousands to millions, I encountered scaling challenges that required rethinking my approach. Here's what I learned while scaling a serverless API to handle over 10 million monthly requests.

## Initial Architecture

My application started with a simple architecture:

1. API Gateway as the entry point
2. Lambda functions for business logic
3. DynamoDB for data storage
4. S3 for file storage

This worked beautifully until we hit about 1 million monthly requests.

## Challenge 1: Cold Starts

**Problem:** As traffic increased, users occasionally experienced delays of 1-2 seconds when their requests hit a "cold" Lambda function.

**Solution:** I implemented a combination of strategies:

1. **Provisioned concurrency**: For critical endpoints, I configured provisioned concurrency to keep functions warm at all times.

2. **Optimized runtime**: Switching from Node.js with a heavy framework to lightweight functions significantly reduced cold start times.

3. **Streamlined dependencies**: I audited dependencies ruthlessly, removing anything non-essential and using tools like esbuild to minimize bundle sizes.

**Code example:**
\`\`\`typescript
// Before: Heavy dependencies
import * as lodash from 'lodash'; // Imports the entire library
import { parse } from 'date-fns';
import * as AWS from 'aws-sdk'; // Imports the entire SDK

// After: Optimized imports
import pick from 'lodash/pick'; // Imports only what's needed
import { parseISO } from 'date-fns/fp'; // Smaller functional version
import { DynamoDB } from '@aws-sdk/client-dynamodb'; // Only import specific service
\`\`\`

## Challenge 2: Database Scaling

**Problem:** As data volume grew, DynamoDB began throttling requests during peak traffic.

**Solution:** I refined our data access patterns with these techniques:

1. **On-demand capacity**: Switched from provisioned to on-demand capacity to handle unpredictable traffic spikes.

2. **Caching strategy**: Implemented a multi-level caching approach:
   - In-memory cache within Lambda functions for hot data
   - DAX (DynamoDB Accelerator) for frequently accessed items
   - ElastiCache for shared caching needs

3. **Data partitioning**: Redesigned partition keys to distribute data more evenly and avoid hot partitions.

**Before:**
\`\`\`typescript
// Problematic schema with potential hot partition
const params = {
  TableName: 'Users',
  Key: {
    userId: '123', // Many operations on the same user create a hot key
  }
};
\`\`\`

**After:**
\`\`\`typescript
// Improved schema with composite keys for better distribution
const params = {
  TableName: 'UserActions',
  Key: {
    userId: '123',
    actionId: `${timestamp}#${uuid()}` // Ensures even distribution
  }
};
\`\`\`

## Challenge 3: Cost Optimization

**Problem:** As scale increased, costs grew faster than expected, particularly with API Gateway and Lambda.

**Solution:** I implemented these optimizations:

1. **Batch processing**: Instead of processing events one by one, I implemented batching where appropriate.

2. **Lambda power tuning**: Used the AWS Lambda Power Tuning tool to find the optimal memory/CPU configuration for each function, sometimes finding that higher memory settings actually reduced costs by completing faster.

3. **API Gateway caching**: Enabled caching at the API Gateway level for frequently accessed, relatively static data.

4. **GraphQL consolidation**: Replaced multiple REST endpoints with a single GraphQL endpoint, reducing the total number of Lambda invocations.

## Challenge 4: Monitoring and Observability

**Problem:** As complexity increased, it became difficult to identify performance bottlenecks and errors.

**Solution:** I built a comprehensive observability system:

1. **Structured logging**: Standardized logging format across all functions with correlation IDs to track requests.

2. **Custom metrics**: Created custom CloudWatch metrics for business-level monitoring.

3. **Tracing**: Implemented AWS X-Ray tracing to identify latency issues across services.

4. **Alerting**: Set up automated alerting based on error rates and latency thresholds.

**Example structured logging:**
\`\`\`typescript
const logger = (correlationId: string) => ({
  info: (message: string, data?: Record<string, unknown>) => console.log(JSON.stringify({
    level: 'INFO',
    timestamp: new Date().toISOString(),
    correlationId,
    message,
    ...data
  })),
  error: (message: string, error?: Error, data?: Record<string, unknown>) => console.error(JSON.stringify({
    level: 'ERROR',
    timestamp: new Date().toISOString(),
    correlationId,
    message,
    errorName: error?.name,
    errorMessage: error?.message,
    stackTrace: error?.stack,
    ...data
  }))
});

// Usage in Lambda handler
export const handler = async (event: APIGatewayProxyEvent) => {
  const correlationId = event.headers['x-correlation-id'] || uuidv4();
  const log = logger(correlationId);
  
  try {
    log.info('Processing request', { path: event.path });
    // Handler logic
    return {
      statusCode: 200,
      headers: {
        'x-correlation-id': correlationId
      },
      body: JSON.stringify({ result: 'success' })
    };
  } catch (error) {
    log.error('Request failed', error as Error, { path: event.path });
    return {
      statusCode: 500,
      headers: {
        'x-correlation-id': correlationId
      },
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};
\`\`\`

## Challenge 5: Testing at Scale

**Problem:** Local testing didn't catch issues that only appeared at scale.

**Solution:** I developed a more comprehensive testing strategy:

1. **Load testing**: Used Artillery.io to simulate production-level traffic.

2. **Chaos engineering**: Deliberately introduced failures to ensure the system could recover gracefully.

3. **Staged rollouts**: Implemented canary deployments to test changes with a small percentage of traffic before full rollout.

## Lessons Learned

1. **Serverless doesn't mean "no ops"**: You still need operational excellence, just focused on different areas.

2. **Design for elasticity from the start**: Consider how each component will scale under load.

3. **Cost optimization is an ongoing process**: Regularly review usage patterns and adjust accordingly.

4. **Observability is crucial**: You can't optimize what you can't measure.

5. **Embrace managed services**: Focus your energy on your core business logic and let AWS handle the undifferentiated heavy lifting.

Serverless architectures can absolutely scale to handle millions or even billions of requests, but doing so efficiently requires thoughtful design and continuous optimization. The effort is worth it—our fully serverless architecture now handles 10M+ monthly requests with excellent reliability, lower operational overhead, and proportional costs.

What challenges have you faced when scaling serverless applications? Share your experiences in the comments!
    `,
    date: "2024-02-10",
    coverImage: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    readingTime: 15,
    tags: ["AWS", "Serverless", "API Development", "Performance"],
    author: {
      name: "Jane Developer",
      bio: "Full-stack developer and indie hacker building useful tools for developers."
    }
  }
];
