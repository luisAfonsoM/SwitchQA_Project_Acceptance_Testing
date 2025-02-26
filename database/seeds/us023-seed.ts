import db from '../../database';

const us023seed = async () => {
    const userQuery = `
    INSERT INTO base_user (base_user_id, user_email, username, user_password, created_at, updated_at) VALUES ("43934178-0dbd-49cc-b4de-ae5019d3b25f", "recentPostsHighlighted@dddforum.com", "JoeDoe", "$2a$12$c3kHZLQsMACjvspfCMH4AO.zm0sEx0GLPxd.7Pn6pTToqrzQiyf2a", "2023-12-02 16:00:00", "2023-12-02 16:00:00");
    `;
  
    const memberQuery = `
    INSERT INTO member (member_id, member_base_id, reputation, created_at, updated_at) VALUES ("39f9ecf9-80c4-4afe-8395-e89b04f547ec", "43934178-0dbd-49cc-b4de-ae5019d3b25f", 0, "2023-12-02 16:00:00", "2023-12-02 16:00:00");
    `;

    const postQuery1 = `
    INSERT INTO post (post_id, member_id, type, title, text, slug, points, total_num_comments, created_at, updated_at) VALUES ("61996fbd-8027-4c8b-8ac5-d453856b9fb6", "39f9ecf9-80c4-4afe-8395-e89b04f547ec", "text", "Lorem ipsum dolor sit amet", "consectetur adipiscing elit ut", "1111112-Old-Post-5-days-ago", "0", "2", "2023-12-06 16:31:00", "2023-12-06 16:31:00");
      `;
    
    const postQuery2 = `
    INSERT INTO post (post_id, member_id, type, title, text, slug, points, total_num_comments, created_at, updated_at) VALUES ("e65f209c-7952-4a21-9cbb-ccc32c1fb75e", "39f9ecf9-80c4-4afe-8395-e89b04f547ec", "text", "Nulla ultricies consectetur est ut porttitor", "Pellentesque vestibulum, mi sed maximus dictum", "1111113-Young-Post-4-days-ago", "0", "2", "2023-12-05 16:31:00", "2023-12-05 16:31:00");
      `;

    try {
        await db.promise().query(userQuery);
        await db.promise().query(memberQuery);
        await db.promise().query(postQuery1);
        await db.promise().query(postQuery2);
      console.log('us023 test data seeded successfully.');
    } catch (error) {
      console.error('Error seeding us023 test data:', error);
    }
  };

  export default us023seed;