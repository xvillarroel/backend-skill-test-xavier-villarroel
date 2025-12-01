const argon2 = require('argon2');
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/school_mgmt'
});

async function fixAdminPassword() {
  console.log('🔧 Fixing admin password...\n');

  const password = '3OU4zn3q6Zh9';
  
  try {
    // Generate Argon2 hash
    console.log('1. Generating Argon2 hash for password:', password);
    const hashedPassword = await argon2.hash(password);
    console.log('✅ Hash generated:', hashedPassword.substring(0, 50) + '...\n');

    // Update database
    console.log('2. Updating admin user in database...');
    const result = await pool.query(
      'UPDATE users SET password = $1 WHERE email = $2 RETURNING id, name, email',
      [hashedPassword, 'admin@school-admin.com']
    );

    if (result.rows.length > 0) {
      console.log('✅ Admin user updated successfully:');
      console.log('   ID:', result.rows[0].id);
      console.log('   Name:', result.rows[0].name);
      console.log('   Email:', result.rows[0].email);
      console.log('\n✨ Password is now: 3OU4zn3q6Zh9');
    } else {
      console.log('❌ Admin user not found');
    }

    await pool.end();
    console.log('\n🎉 Done! You can now login with:');
    console.log('   Email: admin@school-admin.com');
    console.log('   Password: 3OU4zn3q6Zh9');

  } catch (error) {
    console.error('❌ Error:', error.message);
    await pool.end();
    process.exit(1);
  }
}

fixAdminPassword();
